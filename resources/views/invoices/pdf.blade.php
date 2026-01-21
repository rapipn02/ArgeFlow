<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice #{{ $order->order_number }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #3B82F6;
        }

        .header-left h1 {
            font-size: 36px;
            color: #1F2937;
            margin-bottom: 10px;
        }

        .header-left .company {
            font-size: 14px;
            color: #6B7280;
        }

        .header-right {
            text-align: right;
        }

        .invoice-number {
            font-size: 24px;
            font-weight: bold;
            color: #1F2937;
            margin-bottom: 5px;
        }

        .invoice-date {
            font-size: 12px;
            color: #6B7280;
        }

        .billing-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
        }

        .billing-section {
            width: 48%;
        }

        .billing-section h3 {
            font-size: 12px;
            color: #6B7280;
            text-transform: uppercase;
            margin-bottom: 10px;
            letter-spacing: 0.5px;
        }

        .billing-section .name {
            font-size: 16px;
            font-weight: bold;
            color: #1F2937;
            margin-bottom: 5px;
        }

        .billing-section .details {
            font-size: 13px;
            color: #6B7280;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }

        thead {
            background-color: #F3F4F6;
        }

        th {
            padding: 12px;
            text-align: left;
            font-size: 12px;
            color: #6B7280;
            text-transform: uppercase;
            font-weight: 600;
        }

        th:last-child {
            text-align: right;
        }

        td {
            padding: 15px 12px;
            border-bottom: 1px solid #E5E7EB;
        }

        td:last-child {
            text-align: right;
        }

        .item-description {
            font-weight: 500;
            color: #1F2937;
            margin-bottom: 3px;
        }

        .item-note {
            font-size: 12px;
            color: #6B7280;
        }

        .status-paid {
            color: #10B981;
            font-weight: 600;
            font-size: 12px;
        }

        .status-pending {
            color: #F59E0B;
            font-weight: 600;
            font-size: 12px;
        }

        .summary {
            float: right;
            width: 50%;
            margin-bottom: 40px;
        }

        .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            color: #6B7280;
        }

        .summary-row.total {
            border-top: 2px solid #E5E7EB;
            margin-top: 10px;
            padding-top: 15px;
            font-size: 18px;
            font-weight: bold;
            color: #1F2937;
        }

        .summary-row.amount-due {
            color: #3B82F6;
            font-weight: 600;
        }

        .summary-row.amount-paid {
            color: #10B981;
            font-weight: 600;
        }

        .payment-history {
            background-color: #F9FAFB;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            clear: both;
        }

        .payment-history h3 {
            font-size: 12px;
            color: #6B7280;
            text-transform: uppercase;
            margin-bottom: 15px;
            letter-spacing: 0.5px;
        }

        .payment-row {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            font-size: 13px;
        }

        .payment-row .label {
            color: #6B7280;
        }

        .payment-row .value {
            color: #1F2937;
            font-weight: 500;
        }

        .footer {
            text-align: center;
            padding-top: 30px;
            border-top: 1px solid #E5E7EB;
            font-size: 12px;
            color: #6B7280;
        }

        .footer p {
            margin-bottom: 5px;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="header-left">
                <h1>INVOICE</h1>
                <div class="company">
                    <div style="font-weight: 600; color: #1F2937;">ArgeFlow</div>
                    <div>Software Development Services</div>
                </div>
            </div>
            <div class="header-right">
                <div style="font-size: 11px; color: #6B7280; margin-bottom: 5px;">Invoice Number</div>
                <div class="invoice-number">#{{ $order->order_number }}</div>
                <div class="invoice-date">{{ \Carbon\Carbon::parse($order->created_at)->format('d F Y') }}</div>
            </div>
        </div>

        <!-- Billing Info -->
        <div class="billing-info">
            <div class="billing-section">
                <h3>Billed To</h3>
                <div class="name">{{ $order->user->name }}</div>
                <div class="details">{{ $order->user->email }}</div>
            </div>
            <div class="billing-section">
                <h3>Service Details</h3>
                <div class="name">{{ $order->service->name }}</div>
                @if($order->team)
                    <div class="details">Tim: {{ $order->team->name }}</div>
                @endif
            </div>
        </div>

        <!-- Items Table -->
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th style="width: 150px;">Amount</th>
                    <th style="width: 100px;">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="item-description">Down Payment (40%)</div>
                        <div class="item-note">Initial payment for project kickoff</div>
                    </td>
                    <td style="font-weight: 600;">Rp {{ number_format($order->dp_amount, 0, ',', '.') }}</td>
                    <td class="{{ $order->dp_paid_at ? 'status-paid' : 'status-pending' }}">
                        {{ $order->dp_paid_at ? 'PAID' : 'PENDING' }}
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="item-description">Final Payment (60%)</div>
                        <div class="item-note">Final payment upon project completion</div>
                    </td>
                    <td style="font-weight: 600;">Rp {{ number_format($order->final_amount, 0, ',', '.') }}</td>
                    <td class="{{ $order->final_paid_at ? 'status-paid' : 'status-pending' }}">
                        {{ $order->final_paid_at ? 'PAID' : 'PENDING' }}
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Summary -->
        <div class="summary">
            <div class="summary-row">
                <span>Subtotal</span>
                <span>Rp {{ number_format($order->total_amount, 0, ',', '.') }}</span>
            </div>
            <div class="summary-row">
                <span>Tax (0%)</span>
                <span>Rp 0</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span>Rp {{ number_format($order->total_amount, 0, ',', '.') }}</span>
            </div>
            @if($order->payment_status === 'dp_paid')
                <div class="summary-row amount-due">
                    <span>Amount Due</span>
                    <span>Rp {{ number_format($order->final_amount, 0, ',', '.') }}</span>
                </div>
            @elseif($order->payment_status === 'fully_paid')
                <div class="summary-row amount-paid">
                    <span>Amount Paid</span>
                    <span>Rp {{ number_format($order->total_amount, 0, ',', '.') }}</span>
                </div>
            @endif
        </div>

        <!-- Payment History -->
        @if($order->dp_paid_at || $order->final_paid_at)
            <div class="payment-history">
                <h3>Payment History</h3>
                @if($order->dp_paid_at)
                    <div class="payment-row">
                        <span class="label">DP Payment</span>
                        <span class="value">{{ \Carbon\Carbon::parse($order->dp_paid_at)->format('d F Y') }}</span>
                    </div>
                @endif
                @if($order->final_paid_at)
                    <div class="payment-row">
                        <span class="label">Final Payment</span>
                        <span class="value">{{ \Carbon\Carbon::parse($order->final_paid_at)->format('d F Y') }}</span>
                    </div>
                @endif
            </div>
        @endif

        <!-- Footer -->
        <div class="footer">
            <p><strong>Thank you for your business!</strong></p>
            <p>For any questions regarding this invoice, please contact us at support@argeflow.com</p>
        </div>
    </div>
</body>

</html>