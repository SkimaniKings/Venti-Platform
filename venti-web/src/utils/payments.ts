// venti-web/src/utils/payments.ts
export async function mockInstaPay(amount: number, purpose: string) {
  return new Promise<{ success: boolean; transactionId: string }>((resolve) => {
    setTimeout(() => {
      const transactionId = "txn_" + Math.floor(Math.random() * 1000000);
      console.log(`Payment of $${amount} for ${purpose} processed. Transaction ID: ${transactionId}`);
      resolve({ success: true, transactionId });
    }, 1000); // simulate network delay
  });
}
