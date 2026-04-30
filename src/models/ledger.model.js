const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: [true, "Ledger must be associated with an account"],
      index: true,
    },

    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "transaction",
      required: [true, "Ledger must be linked to a transaction"],
      index: true,
    },

    type: {
      type: String,
      enum: ["DEBIT", "CREDIT"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: [0, "Amount cannot be negative"],
    },

    balanceAfter: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const ledgerModel = mongoose.model("ledger", ledgerSchema);

module.exports = ledgerModel;