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
  const carcCodes = result.analysis?.claimAdjustmentReasonCodes ?? [];
  const rarcCodes = result.analysis?.remittanceAdviceRemarkCodes ?? [];
  const providerAdjustments = result.analysis?.providerLevelAdjustments ?? [];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 max-w-[100%] overflow-x-auto">
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
      {carcCodes.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-2">
            Claim Adjustment Reason Codes
          </h3>
          <pre className="text-xs bg-slate-100 p-3 rounded overflow-auto">
            {JSON.stringify(carcCodes, null, 2)}
          </pre>
        </section>
      )}

      {/* RARC CODES */}
      {rarcCodes.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-2">
            Remittance Remark Codes
          </h3>
          <pre className="text-xs bg-slate-100 p-3 rounded overflow-auto ">
            {JSON.stringify(rarcCodes, null, 2)}
          </pre>
        </section>
      )}

      {/* PROVIDER LEVEL ADJUSTMENTS (PLB) */}
      {providerAdjustments.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-2">
            Provider-Level Adjustments (PLB)
          </h3>
          <pre className="text-xs bg-slate-100 p-3 rounded overflow-auto ">
            {JSON.stringify(providerAdjustments, null, 2)}
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
    </div>
  );
};
