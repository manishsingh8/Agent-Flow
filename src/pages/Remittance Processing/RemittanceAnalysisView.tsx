import React from "react";

interface RemitResponse {
  fileName: string;
  result: {
    suggestions?: any[];
    workflow?: {
      suggestedAction?: string;
      reviewPriority?: string;
    };
    analysis?: {
      claimAdjustmentReasonCodes?: any[];
      claimLevelSummary?: any;
      providerLevelAdjustments?: any[];
      remittanceAdviceRemarkCodes?: any[];
      summary?: any;
    };
    expertReviewNarrative?: string;
    adjustments?: any[];
    highConfidenceMatch?: any;
  };
}

export const RemitAnalysisView = ({ data }: { data: RemitResponse }) => {
  if (!data || !data.result) return null;

  const { result } = data;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 max-w-[100%] overflow-x-auto">
      {/* FILE NAME */}
      {/* {data.fileName && (
        <section>
          <h3 className="font-semibold text-lg mb-1">File Name</h3>
          <p className="text-sm text-slate-600">{data.fileName}</p>
        </section>
      )} */}

      {/* WORKFLOW */}
      {/* {result.workflow && (
        <section>
          <h3 className="font-semibold text-lg mb-2">Workflow Suggestion</h3>
          <div className="bg-slate-100 p-4 rounded text-sm">
            {result.workflow?.suggestedAction && (
              <p>
                <span className="font-semibold">Suggested Action:</span>{" "}
                {result.workflow.suggestedAction}
              </p>
            )}
            {result.workflow?.reviewPriority && (
              <p>
                <span className="font-semibold">Priority:</span>{" "}
                {result.workflow.reviewPriority}
              </p>
            )}
          </div>
        </section>
      )} */}

      {/* CLAIM SUMMARY */}
      {result.analysis?.claimLevelSummary && (
        <section>
          <h3 className="font-semibold text-lg mb-2">Claim Summary</h3>
          <pre className="text-xs bg-slate-100 p-3 rounded overflow-auto ">
            {JSON.stringify(result.analysis.claimLevelSummary, null, 2)}
          </pre>
        </section>
      )}

      {/* CARC CODES */}
      {result.analysis?.claimAdjustmentReasonCodes?.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-2">
            Claim Adjustment Reason Codes
          </h3>
          <pre className="text-xs bg-slate-100 p-3 rounded overflow-auto">
            {JSON.stringify(
              result.analysis.claimAdjustmentReasonCodes,
              null,
              2
            )}
          </pre>
        </section>
      )}

      {/* RARC CODES */}
      {result.analysis?.remittanceAdviceRemarkCodes?.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-2">
            Remittance Remark Codes
          </h3>
          <pre className="text-xs bg-slate-100 p-3 rounded overflow-auto ">
            {JSON.stringify(
              result.analysis.remittanceAdviceRemarkCodes,
              null,
              2
            )}
          </pre>
        </section>
      )}

      {/* PROVIDER LEVEL ADJUSTMENTS (PLB) */}
      {result.analysis?.providerLevelAdjustments?.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-2">
            Provider-Level Adjustments (PLB)
          </h3>
          <pre className="text-xs bg-slate-100 p-3 rounded overflow-auto ">
            {JSON.stringify(result.analysis.providerLevelAdjustments, null, 2)}
          </pre>
        </section>
      )}

      {/* PAYMENT SUMMARY */}
      {result.analysis?.summary && (
        <section>
          <h3 className="font-semibold text-lg mb-2">Payment Summary</h3>
          <pre className="text-xs bg-slate-100 p-3 rounded overflow-auto ">
            {JSON.stringify(result.analysis.summary, null, 2)}
          </pre>
        </section>
      )}

      {/* EXPERT NARRATIVE */}
      {result.expertReviewNarrative && (
        <section>
          <h3 className="font-semibold text-lg mb-2">Expert Review</h3>
          <div className="text-xs bg-slate-100 p-3 rounded whitespace-pre-wrap leading-relaxed">
            {result.expertReviewNarrative}
          </div>
        </section>
      )}

      {/* RAW RESULT (Optional Debugging) */}
      {/* 
      <pre className="text-xs bg-slate-200 p-3 rounded">
        {JSON.stringify(result, null, 2)}
      </pre>
      */}
    </div>
  );
};
