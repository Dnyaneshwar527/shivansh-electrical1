import { useState } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateReview, useListReviews, getListReviewsQueryKey } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const reviewSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z.string().min(10, "Review must be at least 10 characters"),
  service: z.string().optional()
});

export default function Reviews() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: reviews, isLoading } = useListReviews();
  const createReview = useCreateReview();
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      customerName: "",
      rating: 5,
      comment: "",
      service: ""
    }
  });

  const onSubmit = (data: z.infer<typeof reviewSchema>) => {
    createReview.mutate({ data }, {
      onSuccess: () => {
        toast({
          title: "Review submitted",
          description: "Thank you for your feedback!",
        });
        form.reset();
        queryClient.invalidateQueries({ queryKey: getListReviewsQueryKey() });
      },
      onError: () => {
        toast({
          title: "Failed to submit review",
          description: "Something went wrong. Please try again later.",
          variant: "destructive"
        });
      }
    });
  };

  const ratingValue = form.watch("rating");

  return (
    <PageWrapper className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Customer Reviews</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          See what our customers have to say about our electrical services. We take pride in delivering top-notch quality and safety.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold mb-6">Recent Reviews</h2>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-muted rounded-xl h-32 w-full"></div>
              ))}
            </div>
          ) : reviews && reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review, i) => (
                <div key={i} className="bg-card border rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{review.customerName}</h3>
                      {review.service && <p className="text-sm text-muted-foreground">{review.service}</p>}
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`h-4 w-4 ${star <= review.rating ? "text-accent fill-accent" : "text-muted"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground">{review.comment}</p>
                  <p className="text-xs text-muted-foreground mt-4">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-xl border">
              <p className="text-muted-foreground">No reviews yet. Be the first to leave one!</p>
            </div>
          )}
        </div>

        <div className="bg-card border rounded-xl p-6 shadow-sm h-fit sticky top-24">
          <h2 className="text-xl font-semibold mb-6">Leave a Review</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Your Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => form.setValue("rating", star)}
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${(hoveredRating || ratingValue) >= star ? "text-accent fill-accent" : "text-muted stroke-muted"}`}
                    />
                  </button>
                ))}
              </div>
              {form.formState.errors.rating && <p className="text-sm text-destructive">{form.formState.errors.rating.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerName">Your Name</Label>
              <Input id="customerName" {...form.register("customerName")} placeholder="John Doe" />
              {form.formState.errors.customerName && <p className="text-sm text-destructive">{form.formState.errors.customerName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Service (Optional)</Label>
              <Input id="service" {...form.register("service")} placeholder="e.g. House Wiring" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Your Review</Label>
              <Textarea id="comment" {...form.register("comment")} placeholder="Tell us about your experience..." rows={4} />
              {form.formState.errors.comment && <p className="text-sm text-destructive">{form.formState.errors.comment.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={createReview.isPending}>
              {createReview.isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
