import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureAndFinalizePaymentService } from "@/services";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

function PaypalPaymentReturnPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      async function capturePayment() {
        try {
          const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
          if (!orderId) {
            throw new Error("Order ID not found");
          }

          const response = await captureAndFinalizePaymentService(
            paymentId,
            payerId,
            orderId
          );

          if (response?.success) {
            sessionStorage.removeItem("currentOrderId");
            toast({
              title: "Payment successful!",
              description: "You can now access your course.",
            });
            navigate("/student/courses");
          } else {
            throw new Error(response?.message || "Payment failed");
          }
        } catch (error) {
          console.error("Payment error:", error);
          toast({
            variant: "destructive",
            title: "Payment failed",
            description: error.message || "There was an error processing your payment. Please try again.",
          });
          navigate("/student/courses");
        } finally {
          setIsProcessing(false);
        }
      }

      capturePayment();
    } else {
      toast({
        variant: "destructive",
        title: "Invalid payment",
        description: "Payment information is missing. Please try again.",
      });
      navigate("/student/courses");
    }
  }, [payerId, paymentId, navigate, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isProcessing ? "Processing payment... Please wait" : "Redirecting..."}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalPaymentReturnPage;
