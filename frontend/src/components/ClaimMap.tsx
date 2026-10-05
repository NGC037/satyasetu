"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  HelpCircle,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Calendar,
} from "lucide-react";
import { ClaimDecomposition, VerdictCategory } from "@/types";

interface ClaimMapProps {
  claims: ClaimDecomposition[];
  onSelectClaimTimestamp?: (
    range: { start: string; end: string } | null,
  ) => void;
}

export const ClaimMap: React.FC<ClaimMapProps> = ({
  claims,
  onSelectClaimTimestamp,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    claims[0]?.id || "claim_1",
  );

  const getBadge = (verdict: VerdictCategory) => {
    switch (verdict) {
      case "false":
        return (
          <span className="bg-rose-100 text-rose-800 border border-rose-200 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center space-x-1">
            <AlertCircle className="h-3 w-3" />
            <span>FALSE / UNSUPPORTED</span>
          </span>
        );
      case "cannot_confirm":
        return (
          <span className="bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center space-x-1">
            <HelpCircle className="h-3 w-3" />
            <span>CANNOT CONFIRM</span>
          </span>
        );
      case "outdated":
        return (
          <span className="bg-orange-100 text-orange-800 border border-orange-200 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>OUTDATED / UNVERIFIED</span>
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full text-xs font-bold">
            NEUTRAL
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Signature Analysis: The Claim Map
          </h2>
          <p className="text-xs text-slate-500">
            Deconstructed sub-claims verified independently against official
            sources
          </p>
        </div>
        <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-lg">
          {claims.length} Claims Isolated
        </span>
      </div>

      <div className="space-y-4">
        {claims.map((claim, index) => {
          const isExpanded = expandedId === claim.id;

          return (
            <div
              key={claim.id}
              className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-white"
            >
              {/* Claim Row Header */}
              <div
                onClick={() => {
                  setExpandedId(isExpanded ? null : claim.id);
                  if (
                    claim.timestamp_start &&
                    claim.timestamp_end &&
                    onSelectClaimTimestamp
                  ) {
                    onSelectClaimTimestamp({
                      start: claim.timestamp_start,
                      end: claim.timestamp_end,
                    });
                  }
                }}
                className="p-4 cursor-pointer hover:bg-slate-50 flex items-start justify-between space-x-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-400">
                      CLAIM 0{index + 1}
                    </span>
                    {getBadge(claim.verdict)}
                    {claim.tactical_tag && (
                      <span className="bg-purple-100 text-purple-800 border border-purple-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {claim.tactical_tag}
                      </span>
                    )}
                    {claim.timestamp_start && (
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-mono px-2 py-0.5 rounded">
                        🎙 {claim.timestamp_start} - {claim.timestamp_end}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {claim.text}
                  </p>
                </div>
                <button className="text-slate-400 hover:text-slate-600 pt-1">
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Expandable Evidence Drawer */}
              {isExpanded && (
                <div className="bg-slate-50 border-t border-slate-200 p-4 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Why this verdict?
                    </span>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      {claim.reason}
                    </p>
                  </div>

                  {claim.evidence.length > 0 ? (
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Inspectable Evidence &amp; Sources
                      </span>
                      {claim.evidence.map((ev, eIdx) => (
                        <div
                          key={eIdx}
                          className="bg-white border border-slate-200 rounded-lg p-3 text-xs"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-900">
                              {ev.publisher}
                            </span>
                            <span className="flex items-center text-[10px] text-slate-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              {ev.date}
                            </span>
                          </div>
                          <p className="text-slate-600 italic mb-2 border-l-2 border-emerald-500 pl-2">
                            &ldquo;{ev.excerpt}&rdquo;
                          </p>
                          <a
                            href={ev.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 font-medium text-[11px]"
                          >
                            <span>Inspect Source Document</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs flex items-start space-x-2 text-amber-800">
                      <ShieldAlert className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">
                          Responsible AI Refusal:
                        </span>
                        <p className="text-[11px] mt-0.5">
                          No matching circulars found on official portals.
                          SatyaSetu explicitly refuses to hallucinate facts when
                          trusted evidence is missing.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
