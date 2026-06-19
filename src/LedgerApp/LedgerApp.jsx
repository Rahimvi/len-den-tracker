import { useState } from "react";
import { MdDelete } from "react-icons/md";

export default function LedgerApp() {
  const [transactions, setTransactions] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("get"); // 'get' বা 'give'

  const handleAdd = (e) => {
    e.preventDefault();
    if (!purpose || !amount) return;

    setTransactions([
      ...transactions,
      { id: Date.now(), purpose, amount: parseFloat(amount), type },
    ]);
    setPurpose("");
    setAmount("");
  };

  // হিসাব-নিকাশ
  const totalGet = transactions
    .filter((t) => t.type === "get")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalGive = transactions
    .filter((t) => t.type === "give")
    .reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalGet - totalGive;
  //   delete item
  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-base-200 min-h-screen rounded-xl shadow-lg text-[4vw] sm:text-[3vw] md:text-[2.5vw]">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">
        📊 লেন-দেন ট্র্যাকার
      </h1>

      {/* নেট ব্যালেন্স কার্ড */}
      <div
        className={`stat shadow bg-base-100 rounded-box mb-6 border-l-4 ${netBalance >= 0 ? "border-success" : "border-error text-center"}`}
      >
        <div className="stat-title">নিট হিসাব (Net Balance)</div>
        <div
          className={`stat-value ${netBalance >= 0 ? "text-success" : "text-error"}`}
        >
          {netBalance} TK
        </div>
        <div className="stat-desc">
          {netBalance >= 0 ? "আমি টাকা পাব। 😎" : "আপনি টাকা পাবেন 😰"}
        </div>
      </div>

      {/* ইনপুট ফর্ম */}
      <form
        onSubmit={handleAdd}
        className="grid grid-cols-4 md:grid-cols-4 gap-4 bg-base-100 p-4 rounded-box shadow mb-6 text-[4vw] sm:text-[3vw] md:text-[2.5vw]"
      >
        <input
          type="text"
          placeholder="কী বাবদ? (Purpose)"
          className="input input-bordered w-full"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
        <input
          type="number"
          placeholder="টাকার পরিমাণ"
          className="input input-bordered w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="select select-bordered w-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="get">আমি পাবো (+)</option>
          <option value="give">আমি দেবো (-)</option>
        </select>
        <button type="submit" className="btn btn-primary w-full">
          যোগ করুন
        </button>
      </form>

      {/* লিস্ট সেকশন */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        {/* আমি পাবো কলাম */}
        <div className="bg-base-100 p-4 rounded-box shadow">
          <h2 className="text-xl font-bold text-success border-b pb-2 mb-3">
            🟢 আমি পাবো (Receivable)
          </h2>
          <ul className="space-y-2">
            {transactions
              .filter((t) => t.type === "get")
              .map((t) => (
                <li
                  key={t.id}
                  className="flex justify-between bg-success/10 p-2 rounded"
                >
                  <span>{t.purpose}</span>
                  <span className="font-semibold text-success">
                    +{t.amount} TK
                  </span>
                  <button onClick={() => handleDelete(t.id)}>
                    <MdDelete />
                  </button>
                </li>
              ))}
          </ul>
          <div className="mt-4 pt-2 border-t font-bold flex justify-between text-success">
            <span>সর্বমোট পাবো:</span>
            <span>{totalGet} TK</span>
          </div>
        </div>

        {/* আমি দেবো কলাম */}
        <div className="bg-base-100 p-4 rounded-box shadow">
          <h2 className="text-xl font-bold text-error border-b pb-2 mb-3">
            🔴 আমি দেবো (Payable)
          </h2>
          <ul className="space-y-2">
            {transactions
              .filter((t) => t.type === "give")
              .map((t) => (
                <li
                  key={t.id}
                  className="flex justify-between bg-error/10 p-2 rounded"
                >
                  <span>{t.purpose}</span>
                  <span className="font-semibold text-error">
                    -{t.amount} TK
                  </span>
                </li>
              ))}
          </ul>
          <div className="mt-4 pt-2 border-t font-bold flex justify-between text-error">
            <span>সর্বমোট দেবো:</span>
            <span>{totalGive} TK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
