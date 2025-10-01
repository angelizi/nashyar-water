import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { FloatingBackButton } from "@/components/FloatingBackButton";
import { FloatingHomeButton } from "@/components/FloatingHomeButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <Header />
      <FloatingBackButton />
      <FloatingHomeButton />
      
      <div className="container mx-auto px-4 py-8">

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <h2>1. Service Overview</h2>
            <p>
              Our water delivery service provides fresh, clean water directly to your location. 
              All deliveries are completely free of charge to our customers.
            </p>

            <h2>2. Order Processing</h2>
            <p>
              Orders are processed within 24 hours of placement. We will contact you to confirm 
              delivery details and schedule a convenient time.
            </p>

            <h2>3. Quality Guarantee</h2>
            <p>
              We guarantee the quality and freshness of all our water products. If you are not 
              satisfied with your order, please contact us within 24 hours of delivery.
            </p>

            <h2>4. Delivery Policy</h2>
            <p>
              Our delivery service is completely free. We deliver to most locations within our 
              service area. Delivery times may vary based on location and demand.
            </p>

            <h2>5. Cancellation Policy</h2>
            <p>
              Orders can be cancelled up to 2 hours before the scheduled delivery time. 
              Please contact our customer service team for cancellations.
            </p>

            <h2>6. Privacy Policy</h2>
            <p>
              We respect your privacy and will not share your personal information with third parties. 
              Your data is used solely for order processing and delivery purposes.
            </p>

            <h2>7. Contact Information</h2>
            <p>
              For any questions or concerns, please contact our customer service team. 
              We are committed to providing excellent service and resolving any issues promptly.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to update these terms and conditions. Any changes will be 
              posted on this page and will take effect immediately.
            </p>

            <p className="text-sm text-muted-foreground mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;