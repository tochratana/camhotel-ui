"use client";

import { useState } from "react";
import { 
  useGetPaymentsQuery, 
  useUpdatePaymentStatusMutation,
  useCreatePaymentMutation,
  useGetPaymentStatsQuery
} from "@/lib/feature/paymentSlice";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Loader2, 
  Search, 
  Filter, 
  CreditCard, 
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { PaymentStatus, PaymentMethod } from "@/types/hotel";
import { cn } from "@/lib/utils";

export default function PaymentManagement() {
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "ALL">("ALL");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [draftStatuses, setDraftStatuses] = useState<Record<number, PaymentStatus>>({});
  
  // Form State
  const [bookingId, setBookingId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("PENDING");

  const { data: apiResponse, isLoading, isFetching, refetch } = useGetPaymentsQuery({
    page,
    size: 10,
    status: statusFilter === "ALL" ? undefined : statusFilter as PaymentStatus,
    keyword: searchKeyword || undefined,
  });

  const { data: statsResponse } = useGetPaymentStatsQuery();

  const [updateStatus, updateStatusState] = useUpdatePaymentStatusMutation();
  const isUpdating = updateStatusState.isLoading;
  const [createPayment, { isLoading: isCreating }] = useCreatePaymentMutation();

  const payments = apiResponse?.data?.content ?? [];
  const totalPages = apiResponse?.data?.totalPages ?? 0;
  const totalElements = apiResponse?.data?.totalElements ?? 0;
  const isFirstPage = apiResponse?.data?.first ?? true;
  const isLastPage = apiResponse?.data?.last ?? true;

  const startItem = totalElements === 0 ? 0 : page * 10 + 1;
  const endItem = totalElements === 0 ? 0 : Math.min((page + 1) * 10, totalElements);

  // Calculate total price for current page
  const pageTotal = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId) return toast.error("Booking ID is required");

    try {
      await createPayment({
        bookingId: Number(bookingId),
        paymentMethod,
        paymentStatus
      }).unwrap();
      
      toast.success("Payment recorded successfully!");
      setIsCreateOpen(false);
      setBookingId("");
    } catch (error) {
      toast.error("Failed to record payment. Please verify Booking ID.");
      console.error(error);
    }
  };

  const handleStatusUpdate = async (id: number) => {
    const newStatus = draftStatuses[id];
    if (!newStatus) return;

    try {
      await updateStatus({ id, paymentStatus: newStatus }).unwrap();
      toast.success(`Payment status updated to ${newStatus}`);
      // Clear draft after success
      setDraftStatuses(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } catch (error) {
      toast.error("Failed to update payment status");
      console.error(error);
    }
  };

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case "PAID":
        return <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-800 hover:bg-emerald-500/20">PAID</Badge>;
      case "PENDING":
        return <Badge className="bg-amber-500/15 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-800 hover:bg-amber-500/20">PENDING</Badge>;
      case "FAILED":
        return <Badge className="bg-rose-500/15 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-800 hover:bg-rose-500/20">FAILED</Badge>;
      case "REFUNDED":
        return <Badge className="bg-slate-500/15 text-slate-600 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-800 hover:bg-slate-500/20">REFUNDED</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-heading">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalElements}</div>
            <p className="text-xs text-muted-foreground">Across all pages</p>
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-sm bg-primary/5 dark:bg-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-heading">Page Total Revenue</CardTitle>
            <div className="h-4 w-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">$</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${pageTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">Current view sum</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by Payment ID or Booking ID..." 
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
                setPage(0);
              }}
              className="w-full pl-9 pr-4 py-2 bg-background border border-input rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          
          <Select 
            value={statusFilter} 
            onValueChange={(val) => {
              setStatusFilter(val as any);
              setPage(0);
            }}
          >
            <SelectTrigger className="w-full md:w-40 bg-background">
              <Filter className="size-3.5 mr-2 opacity-70" />
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
              <SelectItem value="REFUNDED">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => refetch()} 
            disabled={isFetching}
            className="shrink-0"
          >
            <RefreshCcw className={cn("size-4", isFetching && "animate-spin")} />
          </Button>

          {/* Record Payment Dialog */}
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="size-4" />
                Record Payment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record New Payment</DialogTitle>
                <DialogDescription>
                  Manually record a payment for an existing booking.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreatePayment} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="bookingId">Booking ID</Label>
                  <Input 
                    id="bookingId" 
                    placeholder="e.g. 123" 
                    type="number"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={(val) => setPaymentMethod(val as PaymentMethod)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CASH">Cash</SelectItem>
                        <SelectItem value="KHQR">KHQR</SelectItem>
                        <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                        <SelectItem value="STRIPE">Stripe</SelectItem>
                        <SelectItem value="PAYPAL">PayPal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Initial Status</Label>
                    <Select value={paymentStatus} onValueChange={(val) => setPaymentStatus(val as PaymentStatus)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="PAID">Paid</SelectItem>
                        <SelectItem value="FAILED">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" className="w-full" disabled={isCreating}>
                    {isCreating ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                    Confirm Payment Record
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="text-sm font-medium text-muted-foreground">
          Total Transactions: <span className="text-foreground">{totalElements}</span>
        </div>
      </div>

      {/* Payments Table */}
      <Card className="border-border/60 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 pb-4">
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <CardDescription>Comprehensive list of all guest payments</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p>Loading transactions...</p>
            </div>
          ) : payments.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <CreditCard className="size-10 opacity-20" />
              <p>No transactions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 hover:bg-muted/20 font-heading">
                    <TableHead className="w-24">Payment ID</TableHead>
                    <TableHead className="w-24">Booking ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Paid At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-muted/10 transition-colors">
                      <TableCell className="font-mono text-xs text-muted-foreground font-bold">
                        PYM-{payment.id}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-primary font-bold">
                        #BK-{payment.booking?.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{payment.booking?.user?.fullName}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-45">{payment.booking?.user?.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-primary">
                        ${payment.amount?.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider">
                          {payment.paymentMethod}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(payment.paymentStatus)}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {payment.paidAt ? formatDate(payment.paidAt) : <span className="opacity-50">—</span>}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Select 
                            value={draftStatuses[payment.id] ?? payment.paymentStatus}
                            onValueChange={(val) => setDraftStatuses(prev => ({ ...prev, [payment.id]: val as PaymentStatus }))}
                            disabled={isUpdating}
                          >
                            <SelectTrigger className="h-8 w-27.5 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent align="end">
                              <SelectItem value="PENDING">Mark Pending</SelectItem>
                              <SelectItem value="PAID">Mark Paid</SelectItem>
                              <SelectItem value="FAILED">Mark Failed</SelectItem>
                              <SelectItem value="REFUNDED">Mark Refunded</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-3 text-xs font-semibold"
                            disabled={!draftStatuses[payment.id] || isUpdating}
                            onClick={() => handleStatusUpdate(payment.id)}
                          >
                            {isUpdating && updateStatusState.originalArgs?.id === payment.id ? (
                              <Loader2 className="size-3 animate-spin" />
                            ) : (
                              "Save"
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
                  {payments.length > 0 && (
                  <tfoot className="bg-muted/10 border-t-2">
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-semibold">Page Summary:</TableCell>
                      <TableCell className="font-bold text-primary text-lg">
                        ${pageTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell colSpan={4}></TableCell>
                    </TableRow>
                  </tfoot>
                  )}
                  </Table>

            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination Container */}
      <div className="mt-4 flex flex-col gap-4 rounded-xl border border-border/50 bg-card/50 p-4 font-sans sm:flex-row sm:items-center sm:justify-between shadow-sm">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Showing <span className="text-foreground font-bold">{startItem}-{endItem}</span> of <span className="text-foreground font-bold">{totalElements}</span> payments
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={isFirstPage || isLoading}
              className="h-8 rounded-lg border-border/60 px-4 text-xs font-semibold transition-all hover:bg-muted"
            >
              Previous
            </Button>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium min-w-[100px] text-center">
              Page <span className="text-foreground font-bold">{page + 1}</span> of <span className="text-foreground font-bold">{Math.max(totalPages, 1)}</span>
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={isLastPage || isLoading}
              className="h-8 rounded-lg border-border/60 px-4 text-xs font-semibold transition-all hover:bg-muted"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
