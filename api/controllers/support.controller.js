import SupportTicket from "../models/SupportTicket.model.js";
import Faq from "../models/Faq.model.js";
import sendEmail from "../utils/sendEmail.js";

const sanitize = (value = "") =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ");

const tokenize = (text = "") =>
  sanitize(text).toLowerCase().split(/\s+/).filter(Boolean);

const buildStaticFaq = (key, question, answer, tags = []) => ({
  _id: `static-${key}`,
  question,
  answer,
  tags,
  createdAt: new Date("2024-01-01"),
});

const STATIC_FAQS = [
  buildStaticFaq(
    1,
    "How do I register as a farmer on Agrimart?",
    "Open the Farmer Registration page, provide farm details, upload Aadhaar and land proof, then submit. Verification typically finishes within 24 hours.",
    ["farmer", "registration"]
  ),
  buildStaticFaq(
    2,
    "Can I list my produce on Agrimart?",
    "Yes. After approval, go to Add Product, enter crop info, quantity, price, and photos. Listings go live once the quality team approves them.",
    ["listing", "produce"]
  ),
  buildStaticFaq(
    3,
    "What documents are needed for verification?",
    "Keep Aadhaar, land ownership or lease proof, and your bank passbook copy ready. Upload clear scans during farmer registration.",
    ["verification"]
  ),
  buildStaticFaq(
    4,
    "How do I place an order for seeds or nutrition?",
    "Browse the Shop categories, add items to the cart, review delivery details, and choose UPI/card/net-banking/COD to complete checkout.",
    ["order"]
  ),
  buildStaticFaq(
    5,
    "Which payment methods are supported?",
    "Agrimart accepts UPI, debit/credit cards, net banking, wallets, and cash on delivery in serviceable pin codes.",
    ["payment"]
  ),
  buildStaticFaq(
    6,
    "How can I track my shipment?",
    "Go to Profile → Orders, select your order, then tap Track Shipment to view live courier updates.",
    ["order", "tracking"]
  ),
  buildStaticFaq(
    7,
    "What is the return and refund policy?",
    "Raise a return within 7 days of delivery via the Orders page. Upload photos if the item is damaged. Refunds are processed within 5-7 working days after pickup.",
    ["returns"]
  ),
  buildStaticFaq(
    8,
    "Do you provide agronomy or crop advisory?",
    "Yes. Chat with AgriBot, browse Help → FAQ, or raise a ticket describing your crop, stage, and issue. Our agronomy desk replies with tailored guidance.",
    ["support", "agronomy"]
  ),
  buildStaticFaq(
    9,
    "How do I contact support?",
    "Visit /support for phone/email options, raise a ticket at /tickets, or use the in-app chat assistant for instant help.",
    ["support"]
  ),
  buildStaticFaq(
    10,
    "Can I schedule bulk purchases for the season?",
    "Yes. Send quantities, crops, and delivery timeline via Contact Support or a ticket. We share bulk pricing and logistics plans for FPOs and co-ops.",
    ["bulk", "orders"]
  ),
  buildStaticFaq(
    11,
    "Are there special offers for farmers?",
    "Enable notifications to receive seasonal coupons, government scheme alerts, and bundle discounts curated for farmers.",
    ["offers"]
  ),
  buildStaticFaq(
    12,
    "How are delivery charges calculated?",
    "Orders above ₹999 usually ship free. Otherwise, shipping depends on weight, distance, and courier availability.",
    ["delivery"]
  ),
  buildStaticFaq(
    13,
    "Can I modify the delivery address after ordering?",
    "You can edit the address within 30 minutes from the Orders page. After dispatch, contact support to request rerouting.",
    ["address"]
  ),
  buildStaticFaq(
    14,
    "Do you sell soil testing kits?",
    "Yes, find soil-testing kits inside Crop Nutrition. Each kit contains sampling instructions and a courier bag for lab submission.",
    ["soil", "nutrition"]
  ),
  buildStaticFaq(
    15,
    "Where can I download GST invoices?",
    "Invoices are created after delivery. Download them from the Orders section or request a copy via support.",
    ["gst", "invoice"]
  ),
  buildStaticFaq(
    16,
    "Do FPOs get special pricing?",
    "Absolutely. Email agrimart4321@gmail.com with your FPO registration details to unlock negotiated prices and priority support.",
    ["fpo", "pricing"]
  ),
  buildStaticFaq(
    17,
    "What if a product is out of stock?",
    "Tap Notify Me on the product page. We alert you when it is replenished or share alternatives through notifications.",
    ["stock"]
  ),
  buildStaticFaq(
    18,
    "How do you ensure input quality?",
    "Agrimart sources from certified brands. Each product lists certification IDs and expiry dates. Request lab reports via support if required.",
    ["quality", "seeds"]
  ),
  buildStaticFaq(
    19,
    "Is equipment financing available?",
    "Yes. Raise a ticket under Payment → Financing with equipment details. We connect you to partner NBFCs for loans.",
    ["finance", "equipment"]
  ),
  buildStaticFaq(
    20,
    "How do I delete my Agrimart account?",
    "Go to Settings → Delete Account, confirm the request, and our team erases your data within 48 hours in line with policy.",
    ["account"]
  ),
];

const heuristicGuides = [
  {
    pattern: /(fertilizer|nutrition|npk|micronutrient|spray schedule|feeding)/i,
    answer:
      "For balanced crop nutrition, follow a soil-test based plan: 1) Apply basal N-P-K as per soil report, 2) Use water-soluble fertilizers during vegetative and flowering stages, 3) Supplement micronutrients (Zn, B, Mg) via foliar spray every 15 days. Agrimart lists ready NPK kits and micronutrient mixes inside Crop Nutrition.",
    suggestions: [
      "Look for 'Crop Nutrition' kits on Agrimart for ready schedules.",
      "Always combine fertilizers with adequate irrigation to avoid burn.",
      "Share your crop variety via support ticket for a crop-specific plan.",
    ],
  },
  {
    pattern: /(pest|disease|insect|fungus|blight|larva|worm|spray)/i,
    answer:
      "For pest or disease outbreaks, identify the stage and pathogen before spraying. Start with integrated pest management: field sanitation, pheromone traps, and selective pesticides. Agrimart's Crop Protection category lists IPM-friendly products. Always rotate actives to prevent resistance.",
    suggestions: [
      "Upload pest photos via support ticket for exact product advice.",
      "Follow label dosage (ml per litre) strictly.",
      "Add stickers/spreaders to improve spray coverage.",
    ],
  },
  {
    pattern: /(soil|ph|organic|compost|manure|bio)/i,
    answer:
      "Healthy soil needs organic matter (compost or FYM), balanced pH, and microbial activity. Test soil every season, apply gypsum or lime when pH is off, and incorporate bio-fertilizers to boost microbes. Agrimart offers soil-testing kits and organic conditioners to restore structure.",
    suggestions: [
      "Collect soil from 5 spots (0-15 cm) for a representative test.",
      "Alternate chemical fertilizer use with compost or green manure.",
      "Mulching helps conserve moisture and suppress weeds.",
    ],
  },
  {
    pattern: /(weather|monsoon|rain|climate|forecast|temperature)/i,
    answer:
      "Monitor local forecasts daily during critical crop stages. Agrimart's Weather page shows district-level rainfall, humidity, and wind to help plan irrigation and spraying. Avoid pesticide application when wind speed exceeds 10 km/h or rain is expected within 6 hours.",
    suggestions: [
      "Use drip irrigation on hot, dry days to reduce evaporation.",
      "Schedule foliar feeding in early morning or late evening.",
      "Store harvested grains only after moisture dips below 12%.",
    ],
  },
  {
    pattern: /(equipment|tractor|harvester|implement|sprayer)/i,
    answer:
      "Agrimart lists certified equipment and implements with warranty support. Choose machinery matching your acreage: mini tillers for under 5 acres, tractors with >35 HP for larger fields, and boom sprayers for uniform coverage. Our support team can assist with demos and financing.",
    suggestions: [
      "Check equipment specs (HP, tank size) before ordering.",
      "Maintain implements regularly—grease joints and clean filters.",
      "Ask support for financing partnerships on large purchases.",
    ],
  },
  {
    pattern: /(order|payment|refund|delivery|shipping|agrimart)/i,
    answer:
      "For Agrimart orders: track status from Profile → Orders, update addresses within 30 minutes, and raise return requests within 7 days if needed. Payments via UPI/card/net-banking are instant; COD availability depends on your pincode.",
    suggestions: [
      "Contact support if tracking is stagnant for 48 hours.",
      "Keep invoices for warranty or subsidy claims.",
      "Use the ticket form for urgent delivery escalations.",
    ],
  },
];

export const createSupportTicket = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      orderId,
      category = "general",
      priority = "medium",
      message,
    } = req.body || {};

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email and message are required." });
    }

    const ticket = await SupportTicket.create({
      name: sanitize(name),
      email: sanitize(email).toLowerCase(),
      phone: phone ? sanitize(phone) : undefined,
      orderId: orderId ? sanitize(orderId) : undefined,
      category,
      priority,
      message: sanitize(message),
      conversation: [
        {
          role: "user",
          message: sanitize(message),
        },
      ],
    });

    await notifySupportTeam(ticket);

    return res.status(201).json({
      message: "Support ticket created successfully.",
      ticket,
    });
  } catch (err) {
    console.error("Support ticket creation failed:", err);
    return res.status(500).json({ message: "Unable to create ticket." });
  }
};

export const listSupportTickets = async (_req, res) => {
  try {
    const tickets = await SupportTicket.find()
      .sort({ createdAt: -1 })
      .limit(50);
    return res.json(tickets);
  } catch (err) {
    console.error("Support ticket list failed:", err);
    return res.status(500).json({ message: "Unable to fetch tickets." });
  }
};

export const askAssistant = async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || sanitize(message).length < 3) {
      return res.status(400).json({
        message: "Please provide a question with at least 3 characters.",
      });
    }

    let faqs = [];
    try {
      faqs = await Faq.find().lean();
    } catch (err) {
      console.error(
        "Assistant DB read failed, falling back to static content:",
        err
      );
    }

    const knowledge = [...faqs, ...STATIC_FAQS];
    const queryTokens = tokenize(message);

    // Detect whether the user question is farming-related. If not, we'll
    // refuse to answer non-farming queries and only offer farming starter
    // suggestions. This ensures the assistant stays focused on farming topics
    // and doesn't show unrelated FAQs (payments/accounts/etc.).
    const farmingKeywords = new Set([
      "soil",
      "crop",
      "fertilizer",
      "nutrition",
      "seed",
      "spray",
      "pest",
      "disease",
      "irrigation",
      "weather",
      "nursery",
      "tractor",
      "equipment",
      "harvester",
      "manure",
      "organic",
      "agronomy",
      "sowing",
      "harvest",
      "fpo",
      "farmer",
      "produce",
      "plant",
      "planting",
      "farm",
      "acre",
    ]);

    const isFarmingRelated = queryTokens.some((t) => farmingKeywords.has(t));

    const scored = knowledge
      .map((faq) => {
        const haystack = tokenize(
          `${faq.question || ""} ${faq.answer || ""} ${(faq.tags || []).join(
            " "
          )}`
        );
        let score = 0;
        queryTokens.forEach((token) => {
          haystack.forEach((word) => {
            if (word === token) score += 3;
            else if (word.includes(token) || token.includes(word)) score += 1;
          });
        });
        return { ...faq, score };
      })
      .filter((faq) => faq.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // gather more then trim to farming ones below

    const best = scored[0];
    let reply;
    // Build suggestions from scored results but only include farming-related
    // FAQs. We treat an FAQ as farming-related if its tags or text contain a
    // farming keyword.
    const suggestionCandidates = scored.filter((faq) => {
      const text = `${faq.question || ""} ${faq.answer || ""} ${(
        faq.tags || []
      ).join(" ")}`.toLowerCase();
      return Array.from(farmingKeywords).some((kw) => text.includes(kw));
    });

    let suggestionsPayload = suggestionCandidates
      .slice(0, 3)
      .map((faq) => ({
        id: faq._id,
        question: faq.question,
        answer: faq.answer,
      }));

    // If the incoming message doesn't look farming-related, return a short
    // guidance message and only show farming starter suggestions (no account/
    // payment/other topics).
    if (!isFarmingRelated) {
      const starter = STATIC_FAQS.filter((f) => {
        const txt = `${f.question} ${f.answer} ${(f.tags || []).join(
          " "
        )}`.toLowerCase();
        return Array.from(farmingKeywords).some((kw) => txt.includes(kw));
      })
        .slice(0, 3)
        .map((f) => ({ id: f._id, question: f.question, answer: f.answer }));

      return res.json({
        reply:
          "I can only help with farming-related questions (soil, pests, seeds, equipment, irrigation, crop nutrition, etc.). Please ask a farming question.",
        suggestions: starter,
        source: "policy",
        askedAt: new Date().toISOString(),
      });
    }

    if (best) {
      // Only pick best if it's farming-related (matches our farmingKeywords)
      const bestText = `${best.question || ""} ${best.answer || ""} ${(
        best.tags || []
      ).join(" ")}`.toLowerCase();
      if (Array.from(farmingKeywords).some((kw) => bestText.includes(kw))) {
        reply = `It looks like you're asking about "${best.question}". Here's what we recommend:\n\n${best.answer}`;
      } else {
        // If best match is not farming-related, fall back to heuristics
        const heuristic = heuristicGuides.find((guide) =>
          guide.pattern.test(message)
        );
        if (heuristic) {
          reply = heuristic.answer;
          suggestionsPayload =
            heuristic.suggestions?.map((tip, idx) => ({
              id: `tip-${idx}`,
              question: `Pro tip ${idx + 1}`,
              answer: tip,
            })) || [];
        } else {
          reply = `I couldn't find an exact farming match, but here's some guidance based on common farming topics.`;
          suggestionsPayload = suggestionsPayload.length
            ? suggestionsPayload
            : STATIC_FAQS.filter((f) => {
                const txt = `${f.question} ${f.answer} ${(f.tags || []).join(
                  " "
                )}`.toLowerCase();
                return Array.from(farmingKeywords).some((kw) =>
                  txt.includes(kw)
                );
              })
                .slice(0, 3)
                .map((f) => ({
                  id: f._id,
                  question: f.question,
                  answer: f.answer,
                }));
        }
      }
    } else {
      const heuristic = heuristicGuides.find((guide) =>
        guide.pattern.test(message)
      );
      if (heuristic) {
        reply = heuristic.answer;
        suggestionsPayload =
          heuristic.suggestions?.map((tip, idx) => ({
            id: `tip-${idx}`,
            question: `Pro tip ${idx + 1}`,
            answer: tip,
          })) || [];
      } else {
        reply = `I'm here to help! I couldn't find an exact match in our farming knowledge base, please provide more details or raise a support ticket.`;
        suggestionsPayload = STATIC_FAQS.filter((f) => {
          const txt = `${f.question} ${f.answer} ${(f.tags || []).join(
            " "
          )}`.toLowerCase();
          return Array.from(farmingKeywords).some((kw) => txt.includes(kw));
        })
          .slice(0, 3)
          .map((faq) => ({
            id: faq._id,
            question: faq.question,
            answer: faq.answer,
          }));
      }
    }

    return res.json({
      reply,
      suggestions: suggestionsPayload,
      source: best ? "faq" : "fallback",
      askedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Assistant failure:", err);
    return res
      .status(500)
      .json({ message: "Assistant is unavailable. Please try again later." });
  }
};

const notifySupportTeam = async (ticket) => {
  const supportInbox =
    process.env.SUPPORT_TEAM_EMAIL || process.env.EMAIL_USER || "";

  const ticketId = ticket?._id?.toString() || "N/A";
  const userSubject = `Agrimart Support Ticket #${ticketId}`;
  const userBody = `Hi ${ticket.name},

We have received your ticket (${ticketId}) regarding "${ticket.category}".

Summary:
${ticket.message}

Our support engineers will get back to you shortly.

Regards,
Agrimart Support`;

  try {
    await sendEmail(ticket.email, userSubject, userBody);
  } catch (err) {
    console.error("Failed to send support ticket ack email:", err);
  }

  if (!supportInbox) {
    return;
  }

  const teamSubject = `New Support Ticket #${ticketId} (${ticket.priority})`;
  const teamBody = `New support ticket submitted.

Ticket ID: ${ticketId}
Name: ${ticket.name}
Email: ${ticket.email}
Phone: ${ticket.phone || "not provided"}
Order ID: ${ticket.orderId || "not provided"}
Category: ${ticket.category}
Priority: ${ticket.priority}
Message:
${ticket.message}

Open the dashboard to respond.`;

  try {
    await sendEmail(supportInbox, teamSubject, teamBody);
  } catch (err) {
    console.error("Failed to send support ticket alert to team:", err);
  }
};
