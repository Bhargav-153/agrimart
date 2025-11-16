import React, { useState } from "react";

const DeleteAccount = () => {
  const [confirm, setConfirm] = useState(false);

  return (
    <section>
      <h3 className="text-xl font-semibold mb-2 text-red-600">Delete Account</h3>
      {!confirm ? (
        <button className="btn-red" onClick={() => setConfirm(true)}>Delete My Account</button>
      ) : (
        <div>
          <p>Are you sure? This action cannot be undone.</p>
          <button className="btn-red" onClick={() => {/* handle delete */}}>Yes, Delete</button>
          <button className="btn" onClick={() => setConfirm(false)}>Cancel</button>
        </div>
      )}
    </section>
  );
};

export default DeleteAccount;