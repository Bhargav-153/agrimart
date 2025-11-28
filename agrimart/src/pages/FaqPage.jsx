import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FAQItem from "../components/FAQItem";
import styles from "./FaqPage.module.css";
import { fetchFaqs, submitFeedback } from "../api/faqApi";
import { RouteChatbot, RouteSupport, RouteTickets } from "../helpers/RouteName";

const buildFallback = (index, question, answer, tags = []) => ({
  _id: `fallback-${index}`,
  question,
  answer,
  tags,
  feedback: 0,
  createdAt: new Date().toISOString(),
});

const FALLBACK_FAQS = [
  buildFallback(
    1,
    "How do I register as a farmer on Agrimart?",
    "Click Farmer Registration in the navigation, fill your farm details, upload the required proofs, and submit for verification within 24 hours.",
    ["farmer", "registration"]
  ),
  buildFallback(
    2,
    "Can I list my own produce on Agrimart?",
    "Yes. After registration, open Add Product, enter crop information, pricing, stock, and submit for review. Approved listings go live instantly.",
    ["listing", "produce"]
  ),
  buildFallback(
    3,
    "What documents do I need for verification?",
    "Keep Aadhaar, land ownership or lease proof, and a bank passbook scan handy while registering. Upload clear images for faster approval.",
    ["verification"]
  ),
  buildFallback(
    4,
    "How do I place an order for seeds or tools?",
    "Browse the Shop categories, add items to cart, review delivery details, then choose a payment option to complete checkout.",
    ["order"]
  ),
  buildFallback(
    5,
    "Which payment methods are supported?",
    "Agrimart accepts UPI, credit/debit cards, net banking, wallets, and cash on delivery in supported regions.",
    ["payment"]
  ),
  buildFallback(
    6,
    "How can I track my order?",
    "Go to Profile → Orders, select the order, and click Track Shipment for live courier updates.",
    ["order", "tracking"]
  ),
  buildFallback(
    7,
    "What is the return policy?",
    "Raise a return request within 7 days of delivery through the Orders page. Upload photos if the product is damaged to accelerate approval.",
    ["returns"]
  ),
  buildFallback(
    8,
    "Do you provide agronomy or crop advice?",
    "Yes. Chat with AgriBot via /chatbot or raise a ticket describing your crop issue. Our agronomy desk responds with best practices.",
    ["support", "agronomy"]
  ),
  buildFallback(
    9,
    "How do I contact support quickly?",
    "Use /support for direct contact info, /tickets to log a case, or the AI assistant for immediate answers any time.",
    ["support"]
  ),
  buildFallback(
    10,
    "Can I schedule bulk orders before the season?",
    "Yes. Message support with crop, quantity, and delivery timeline. We arrange bulk pricing and logistics for FPOs and cooperatives.",
    ["bulk"]
  ),
  buildFallback(
    11,
    "Are there offers for frequent buyers?",
    "Enable notifications to receive seasonal coupons, bundle discounts, and government scheme alerts tailored for farmers.",
    ["offers", "notifications"]
  ),
  buildFallback(
    12,
    "How are shipping charges calculated?",
    "Orders above ₹999 ship free. For smaller carts, cost depends on package weight, serviceability, and courier partners.",
    ["shipping"]
  ),
  buildFallback(
    13,
    "Can I change the delivery address after ordering?",
    "Addresses can be edited within 30 minutes from the Orders page. After dispatch, contact support to assist with rerouting.",
    ["address"]
  ),
  buildFallback(
    14,
    "Do you sell soil testing kits?",
    "Yes, find them under Crop Nutrition. Each kit ships with sampling instructions and lab submission guidelines.",
    ["soil", "nutrition"]
  ),
  buildFallback(
    15,
    "Where can I download GST invoices?",
    "Invoices become available once the order is delivered. Download them from the Orders section or request a copy via support.",
    ["gst", "invoice"]
  ),
  buildFallback(
    16,
    "Do FPOs get special pricing?",
    "Absolutely. Email agrimart4321@gmail.com with your FPO registration to unlock negotiated prices and priority delivery.",
    ["fpo", "pricing"]
  ),
  buildFallback(
    17,
    "What if a product is out of stock?",
    "Use the Notify Me button on the product page. You’ll receive an SMS/email as soon as it is restocked or alternatives become available.",
    ["stock"]
  ),
  buildFallback(
    18,
    "How do you ensure input quality?",
    "Agrimart works only with certified brands. Product pages list certification numbers and expiry dates. Request lab reports through support if needed.",
    ["quality", "seeds"]
  ),
  buildFallback(
    19,
    "Is farm equipment financing available?",
    "Yes. Raise a ticket under Payment → Financing with your requirement; we connect you with partner NBFCs for loans.",
    ["finance", "equipment"]
  ),
  buildFallback(
    20,
    "How do I delete my Agrimart account?",
    "Navigate to Settings → Delete Account, submit the confirmation form, and your account will be removed within 48 hours.",
    ["account"]
  ),
];

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchFaqs();
        if (Array.isArray(data) && data.length > 0) {
          setFaqs(data);
        } else {
          setFaqs(FALLBACK_FAQS);
        }
      } catch (err) {
        setError(
          "Unable to load FAQ data from server. Showing basic FAQs instead."
        );
        setFaqs(FALLBACK_FAQS);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredFaqs = faqs
    .filter(
      (f) =>
        f.question.toLowerCase().includes(query.toLowerCase()) ||
        f.answer.toLowerCase().includes(query.toLowerCase())
    )
    // show most recent first (already sorted by backend, but keep defensive)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // related = farmer or website related (by tag or content)
  const relatedKeywords = /farmer|farm|website|site|web/i;
  const relatedFaqs = faqs
    .filter((f) => {
      const tags = f.tags || [];
      const inTags = tags.some((t) => relatedKeywords.test(String(t)));
      const inContent =
        relatedKeywords.test(f.question || "") ||
        relatedKeywords.test(f.answer || "");
      return inTags || inContent;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // decide what to show: when there's a search query, show filteredFaqs; when no query and not showAll, show latest 6 related; otherwise show all (filtered or all)
  let displayedFaqs;
  if (query.trim()) {
    displayedFaqs = filteredFaqs;
  } else if (!showAll) {
    const baseList =
      relatedFaqs.length > 0
        ? relatedFaqs
        : faqs
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    displayedFaqs = baseList.slice(0, 6);
  } else {
    displayedFaqs = faqs
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const handleFeedback = async (faqId, helpful) => {
    // optimistic update
    setFaqs((prev) =>
      prev.map((f) =>
        f._id === faqId
          ? { ...f, feedback: (f.feedback || 0) + (helpful ? 1 : -1) }
          : f
      )
    );

    try {
      await submitFeedback(faqId, { helpful });
    } catch (err) {
      console.error("Feedback error", err);
      // revert optimistic update on failure
      setFaqs((prev) =>
        prev.map((f) =>
          f._id === faqId
            ? { ...f, feedback: (f.feedback || 0) - (helpful ? 1 : -1) }
            : f
        )
      );
    }
  };

  return (
    <div className={styles.faqPage}>
      <div className={styles.header}>
        <h1>Help & FAQ</h1>
        <p>
          Your questions answered. Search anything related to orders, payments,
          delivery, or support.
        </p>
        <div className={styles.searchRow}>
          <input
            type="text"
            placeholder="Search FAQs... e.g. refund, order, payment"
            className={styles.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className={styles.showAllBtn}
            onClick={() => {
              // toggle showAll; clear query when toggling to show latest/all
              setShowAll((s) => !s);
              setQuery("");
            }}
          >
            {showAll ? "Show latest" : "Show all"}
          </button>
        </div>
      </div>

      <div className={styles.layout}>
        {/* MAIN FAQ LIST */}
        <main className={styles.faqList}>
          {loading && <p className={styles.loading}>Loading FAQs...</p>}
          {error && <p className={styles.error}>{error}</p>}

          {!loading && displayedFaqs.length === 0 && (
            <div className={styles.noResults}>
              <p>No results found. Try different keywords.</p>
            </div>
          )}

          {displayedFaqs.map((faq) => (
            <FAQItem key={faq._id} faq={faq} onFeedback={handleFeedback} />
          ))}
        </main>

        <aside className={styles.sidebar}>
          <div className={styles.helpBox}>
            <h3>Need more help?</h3>
            <p>Our agents reply within a few hours.</p>
            <Link to={RouteSupport} className={styles.supportLink}>
              Contact support
            </Link>
            <Link to={RouteTickets} className={styles.supportLink}>
              Raise a ticket
            </Link>
            <Link to={RouteChatbot} className={styles.supportLink}>
              Chat with AI assistant
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FAQPage;
