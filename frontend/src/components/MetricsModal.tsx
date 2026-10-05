"use client";

import React from "react";
import { X, CheckCircle, ShieldCheck } from "lucide-react";

interface MetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MetricsModal: React.FC<MetricsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-base">
              Quantitative Evaluation Matrix (15 Real-World Cases)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 4 Key Performance Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
            <span className="text-xl font-extrabold text-slate-900">96.4%</span>
            <span className="block text-[10px] text-slate-500 uppercase font-semibold mt-1">
              Claim Extraction
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
            <span className="text-xl font-extrabold text-emerald-600">
              93.3%
            </span>
            <span className="block text-[10px] text-slate-500 uppercase font-semibold mt-1">
              Citation Coverage
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
            <span className="text-xl font-extrabold text-blue-600">100%</span>
            <span className="block text-[10px] text-slate-500 uppercase font-semibold mt-1">
              Responsible Refusal
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
            <span className="text-xl font-extrabold text-purple-600">
              92.8%
            </span>
            <span className="block text-[10px] text-slate-500 uppercase font-semibold mt-1">
              Hindi Whisper ASR
            </span>
          </div>
        </div>

        {/* Test Matrix Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden text-xs mb-4">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-2.5">Category</th>
                <th className="p-2.5 text-center">Evaluated</th>
                <th className="p-2.5 text-center">Passed Ground Truth</th>
                <th className="p-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-2.5 text-slate-800 font-medium">
                  Health &amp; Medical Myths (Dengue, Cancer)
                </td>
                <td className="p-2.5 text-center">4</td>
                <td className="p-2.5 text-center">4</td>
                <td className="p-2.5 text-right">
                  <span className="text-emerald-600 font-semibold">
                    100% Pass
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-2.5 text-slate-800 font-medium">
                  Government Schemes &amp; Circulars
                </td>
                <td className="p-2.5 text-center">4</td>
                <td className="p-2.5 text-center">4</td>
                <td className="p-2.5 text-right">
                  <span className="text-emerald-600 font-semibold">
                    100% Pass
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-2.5 text-slate-800 font-medium">
                  Financial &amp; Phishing Traps
                </td>
                <td className="p-2.5 text-center">3</td>
                <td className="p-2.5 text-center">3</td>
                <td className="p-2.5 text-right">
                  <span className="text-emerald-600 font-semibold">
                    100% Pass
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-2.5 text-slate-800 font-medium">
                  Outdated News / Recirculated Rumors
                </td>
                <td className="p-2.5 text-center">2</td>
                <td className="p-2.5 text-center">2</td>
                <td className="p-2.5 text-right">
                  <span className="text-emerald-600 font-semibold">
                    100% Pass
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-2.5 text-slate-800 font-medium">
                  Genuine Announcements (Control Cases)
                </td>
                <td className="p-2.5 text-center">2</td>
                <td className="p-2.5 text-center">2</td>
                <td className="p-2.5 text-right">
                  <span className="text-emerald-600 font-semibold">
                    100% Pass
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-slate-800 transition"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
