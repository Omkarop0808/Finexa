import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

export default function EmailTemplate({
  userName,
  type,
  data,
}) {
  if (type === "monthly-report") {
    const savingsRate = ((data?.stats?.totalIncome - data?.stats?.totalExpenses) / data?.stats?.totalIncome * 100).toFixed(1);
    const netAmount = data?.stats?.totalIncome - data?.stats?.totalExpenses;
    
    return (
      <Html>
        <Head />
        <Preview>Your {data?.month} Financial Report - ${netAmount} saved this month</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            
            {/* Header */}
            <Section style={styles.header}>
              <Heading style={styles.brandTitle}>Finexa</Heading>
              <Text style={styles.headerSubtitle}>Monthly Financial Report</Text>
            </Section>

            {/* Greeting */}
            <Section style={styles.content}>
              <Heading style={styles.greeting}>Hello {userName},</Heading>
              <Text style={styles.introText}>
                Here's your financial summary for {data?.month}. We've analyzed your spending patterns and prepared insights to help you make better financial decisions.
              </Text>
            </Section>

            {/* Financial Summary Table */}
            <Section style={styles.content}>
              <Heading style={styles.sectionTitle}>Financial Summary</Heading>
              <table style={styles.summaryTable}>
                <tbody>
                  <tr>
                    <td style={styles.summaryLabel}>Total Income</td>
                    <td style={styles.summaryValue}>${data?.stats?.totalIncome?.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style={styles.summaryLabel}>Total Expenses</td>
                    <td style={styles.summaryValue}>${data?.stats?.totalExpenses?.toLocaleString()}</td>
                  </tr>
                  <tr style={styles.summaryHighlight}>
                    <td style={styles.summaryLabelHighlight}>Net Savings</td>
                    <td style={{...styles.summaryValueHighlight, color: netAmount > 0 ? '#059669' : '#dc2626'}}>
                      ${netAmount?.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.summaryLabel}>Savings Rate</td>
                    <td style={{...styles.summaryValue, color: savingsRate > 20 ? '#059669' : savingsRate > 10 ? '#d97706' : '#dc2626'}}>
                      {savingsRate}%
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.summaryLabel}>Total Transactions</td>
                    <td style={styles.summaryValue}>{data?.stats?.transactionCount || 0}</td>
                  </tr>
                </tbody>
              </table>
            </Section>

            {/* Spending Breakdown */}
            {data?.stats?.byCategory && (
              <Section style={styles.content}>
                <Heading style={styles.sectionTitle}>Spending Breakdown</Heading>
                <table style={styles.categoryTable}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Category</th>
                      <th style={styles.tableHeader}>Amount</th>
                      <th style={styles.tableHeader}>% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(data.stats.byCategory)
                      .sort(([,a], [,b]) => b - a)
                      .map(([category, amount], index) => {
                        const percentage = ((amount / data.stats.totalExpenses) * 100).toFixed(1);
                        return (
                          <tr key={category} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                            <td style={styles.categoryName}>{category}</td>
                            <td style={styles.categoryAmount}>${amount.toLocaleString()}</td>
                            <td style={styles.categoryPercentage}>{percentage}%</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </Section>
            )}

            {/* AI Insights */}
            {data?.insights && (
              <Section style={styles.content}>
                <Heading style={styles.sectionTitle}>Key Insights</Heading>
                <div style={styles.insightsContainer}>
                  {data.insights.map((insight, index) => (
                    <div key={index} style={styles.insightItem}>
                      <Text style={styles.insightText}>• {insight}</Text>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Recommendations */}
            <Section style={styles.content}>
              <Heading style={styles.sectionTitle}>Recommended Actions</Heading>
              <table style={styles.actionTable}>
                <tbody>
                  <tr>
                    <td style={styles.actionItem}>
                      <Text style={styles.actionTitle}>Review Transaction Categories</Text>
                      <Text style={styles.actionDesc}>Ensure all transactions are properly categorized for accurate reporting</Text>
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.actionItem}>
                      <Text style={styles.actionTitle}>Plan Next Month's Budget</Text>
                      <Text style={styles.actionDesc}>Use this month's data to set realistic spending targets</Text>
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.actionItem}>
                      <Text style={styles.actionTitle}>Explore Detailed Analytics</Text>
                      <Text style={styles.actionDesc}>Visit your Finexa dashboard for deeper financial insights</Text>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Section>

            <Hr style={styles.divider} />

            {/* Footer */}
            <Section style={styles.footer}>
              <Text style={styles.footerText}>
                Thank you for using Finexa to manage your finances.
              </Text>
              <Text style={styles.footerBrand}>
                Finexa - Smart Financial Management
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-alert") {
    const remaining = data?.budgetAmount - data?.totalExpenses;
    const isOverBudget = remaining < 0;
    const urgencyLevel = data?.percentageUsed >= 95 ? 'critical' : data?.percentageUsed >= 80 ? 'warning' : 'info';
    
    return (
      <Html>
        <Head />
        <Preview>Budget Alert: {data?.percentageUsed?.toFixed(1)}% used - ${Math.abs(remaining)} {isOverBudget ? 'over budget' : 'remaining'}</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            
            {/* Header */}
            <Section style={{
              ...styles.header,
              backgroundColor: urgencyLevel === 'critical' ? '#dc2626' : urgencyLevel === 'warning' ? '#d97706' : '#2563eb'
            }}>
              <Heading style={styles.brandTitle}>Finexa</Heading>
              <Text style={styles.headerSubtitle}>Budget Alert</Text>
            </Section>

            {/* Alert Message */}
            <Section style={{
              ...styles.alertSection,
              backgroundColor: urgencyLevel === 'critical' ? '#fef2f2' : urgencyLevel === 'warning' ? '#fffbeb' : '#eff6ff',
              borderColor: urgencyLevel === 'critical' ? '#dc2626' : urgencyLevel === 'warning' ? '#d97706' : '#2563eb'
            }}>
              <Heading style={styles.alertTitle}>
                {isOverBudget ? 'Budget Exceeded' : 'Budget Alert'}
              </Heading>
              <Text style={styles.alertMessage}>
                Hi {userName}, {isOverBudget 
                  ? `you've exceeded your monthly budget by $${Math.abs(remaining).toLocaleString()}.`
                  : `you've used ${data?.percentageUsed?.toFixed(1)}% of your monthly budget.`
                }
              </Text>
            </Section>

            {/* Budget Overview Table */}
            <Section style={styles.content}>
              <Heading style={styles.sectionTitle}>Budget Overview</Heading>
              
              {/* Progress Indicator */}
              <div style={styles.progressContainer}>
                <div style={styles.progressBar}>
                  <div style={{
                    ...styles.progressFill,
                    width: `${Math.min(data?.percentageUsed, 100)}%`,
                    backgroundColor: urgencyLevel === 'critical' ? '#dc2626' : urgencyLevel === 'warning' ? '#d97706' : '#059669'
                  }}></div>
                </div>
                <Text style={styles.progressText}>{data?.percentageUsed?.toFixed(1)}% of budget used</Text>
              </div>

              <table style={styles.budgetTable}>
                <tbody>
                  <tr>
                    <td style={styles.budgetLabel}>Monthly Budget</td>
                    <td style={styles.budgetValue}>${data?.budgetAmount?.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style={styles.budgetLabel}>Amount Spent</td>
                    <td style={styles.budgetValue}>${data?.totalExpenses?.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style={styles.budgetLabel}>Usage Percentage</td>
                    <td style={{
                      ...styles.budgetValue,
                      color: urgencyLevel === 'critical' ? '#dc2626' : urgencyLevel === 'warning' ? '#d97706' : '#059669'
                    }}>
                      {data?.percentageUsed?.toFixed(1)}%
                    </td>
                  </tr>
                  <tr style={styles.budgetHighlight}>
                    <td style={styles.budgetLabelHighlight}>
                      {isOverBudget ? 'Over Budget' : 'Remaining'}
                    </td>
                    <td style={{
                      ...styles.budgetValueHighlight,
                      color: isOverBudget ? '#dc2626' : '#059669'
                    }}>
                      ${Math.abs(remaining)?.toLocaleString()}
                    </td>
                  </tr>
                  {data?.daysLeft && (
                    <tr>
                      <td style={styles.budgetLabel}>Days Remaining</td>
                      <td style={styles.budgetValue}>{data.daysLeft} days</td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              {data?.accountName && (
                <Text style={styles.accountInfo}>
                  Account: {data.accountName}
                </Text>
              )}
            </Section>

            {/* Recommendations */}
            <Section style={styles.content}>
              <Heading style={styles.sectionTitle}>What You Can Do</Heading>
              <table style={styles.actionTable}>
                <tbody>
                  {isOverBudget ? (
                    <>
                      <tr>
                        <td style={styles.actionItem}>
                          <Text style={styles.actionTitle}>Review Recent Transactions</Text>
                          <Text style={styles.actionDesc}>Check for any unexpected or unusual expenses</Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.actionItem}>
                          <Text style={styles.actionTitle}>Reduce Discretionary Spending</Text>
                          <Text style={styles.actionDesc}>Focus on essential expenses for the rest of the month</Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.actionItem}>
                          <Text style={styles.actionTitle}>Adjust Next Month's Budget</Text>
                          <Text style={styles.actionDesc}>Use this data to create a more realistic budget</Text>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <td style={styles.actionItem}>
                          <Text style={styles.actionTitle}>Monitor Daily Spending</Text>
                          <Text style={styles.actionDesc}>
                            Try to stay within ${data?.daysLeft ? (remaining / data.daysLeft).toFixed(0) : '50'} per day
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.actionItem}>
                          <Text style={styles.actionTitle}>Review Spending Categories</Text>
                          <Text style={styles.actionDesc}>Identify areas where you can optimize expenses</Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.actionItem}>
                          <Text style={styles.actionTitle}>Check Dashboard</Text>
                          <Text style={styles.actionDesc}>View detailed analytics in your Finexa account</Text>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </Section>

            <Hr style={styles.divider} />

            {/* Footer */}
            <Section style={styles.footer}>
              <Text style={styles.footerText}>
                We're here to help you stay on track with your financial goals.
              </Text>
              <Text style={styles.footerBrand}>
                Finexa - Smart Financial Management
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }

  // Fallback for invalid type
  return (
    <Html>
      <Head />
      <Preview>Finexa Notification</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Heading style={styles.brandTitle}>Finexa</Heading>
            <Text style={styles.headerSubtitle}>Notification</Text>
          </Section>
          <Section style={styles.content}>
            <Text style={styles.introText}>
              Hello {userName || 'User'}, this is a notification from Finexa.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f4f4f5",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    margin: 0,
    padding: "20px 0",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    maxWidth: "600px",
    border: "1px solid #e4e4e7",
  },
  
  // Header
  header: {
    backgroundColor: "#3b82f6",
    padding: "24px",
    textAlign: "center",
  },
  brandTitle: {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 0 4px 0",
  },
  headerSubtitle: {
    color: "#dbeafe",
    fontSize: "14px",
    margin: 0,
  },

  // Content sections
  content: {
    padding: "24px",
  },
  greeting: {
    color: "#18181b",
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 16px 0",
  },
  introText: {
    color: "#52525b",
    fontSize: "16px",
    lineHeight: "1.5",
    margin: 0,
  },
  sectionTitle: {
    color: "#18181b",
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 16px 0",
    borderBottom: "2px solid #e4e4e7",
    paddingBottom: "8px",
  },

  // Summary Table
  summaryTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "8px",
  },
  summaryLabel: {
    padding: "12px 0",
    borderBottom: "1px solid #f4f4f5",
    color: "#52525b",
    fontSize: "14px",
    fontWeight: "500",
  },
  summaryValue: {
    padding: "12px 0",
    borderBottom: "1px solid #f4f4f5",
    color: "#18181b",
    fontSize: "16px",
    fontWeight: "600",
    textAlign: "right",
  },
  summaryHighlight: {
    backgroundColor: "#f8fafc",
  },
  summaryLabelHighlight: {
    padding: "12px 0",
    borderBottom: "1px solid #f4f4f5",
    color: "#18181b",
    fontSize: "14px",
    fontWeight: "600",
  },
  summaryValueHighlight: {
    padding: "12px 0",
    borderBottom: "1px solid #f4f4f5",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "right",
  },

  // Category Table
  categoryTable: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #e4e4e7",
  },
  tableHeader: {
    backgroundColor: "#f4f4f5",
    padding: "12px",
    color: "#18181b",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "left",
    borderBottom: "1px solid #e4e4e7",
  },
  tableRowEven: {
    backgroundColor: "#ffffff",
  },
  tableRowOdd: {
    backgroundColor: "#fafafa",
  },
  categoryName: {
    padding: "12px",
    color: "#18181b",
    fontSize: "14px",
    borderBottom: "1px solid #f4f4f5",
  },
  categoryAmount: {
    padding: "12px",
    color: "#3b82f6",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "right",
    borderBottom: "1px solid #f4f4f5",
  },
  categoryPercentage: {
    padding: "12px",
    color: "#52525b",
    fontSize: "14px",
    textAlign: "right",
    borderBottom: "1px solid #f4f4f5",
  },

  // Insights
  insightsContainer: {
    backgroundColor: "#fef3c7",
    padding: "16px",
    border: "1px solid #fbbf24",
    borderRadius: "4px",
  },
  insightItem: {
    marginBottom: "8px",
  },
  insightText: {
    color: "#92400e",
    fontSize: "14px",
    lineHeight: "1.4",
    margin: 0,
  },

  // Action Table
  actionTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  actionItem: {
    padding: "16px 0",
    borderBottom: "1px solid #f4f4f5",
  },
  actionTitle: {
    color: "#18181b",
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 4px 0",
  },
  actionDesc: {
    color: "#52525b",
    fontSize: "14px",
    margin: 0,
  },

  // Budget Alert Styles
  alertSection: {
    padding: "20px 24px",
    border: "2px solid",
    margin: "0",
  },
  alertTitle: {
    color: "#18181b",
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 8px 0",
  },
  alertMessage: {
    color: "#52525b",
    fontSize: "16px",
    margin: 0,
  },

  // Budget Table
  budgetTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "16px",
  },
  budgetLabel: {
    padding: "12px 0",
    borderBottom: "1px solid #f4f4f5",
    color: "#52525b",
    fontSize: "14px",
    fontWeight: "500",
  },
  budgetValue: {
    padding: "12px 0",
    borderBottom: "1px solid #f4f4f5",
    color: "#18181b",
    fontSize: "16px",
    fontWeight: "600",
    textAlign: "right",
  },
  budgetHighlight: {
    backgroundColor: "#f8fafc",
  },
  budgetLabelHighlight: {
    padding: "12px 0",
    borderBottom: "1px solid #f4f4f5",
    color: "#18181b",
    fontSize: "14px",
    fontWeight: "600",
  },
  budgetValueHighlight: {
    padding: "12px 0",
    borderBottom: "1px solid #f4f4f5",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "right",
  },
  accountInfo: {
    color: "#52525b",
    fontSize: "14px",
    margin: 0,
    textAlign: "center",
  },

  // Progress Bar
  progressContainer: {
    marginBottom: "20px",
  },
  progressBar: {
    width: "100%",
    height: "8px",
    backgroundColor: "#f4f4f5",
    border: "1px solid #e4e4e7",
    marginBottom: "8px",
  },
  progressFill: {
    height: "100%",
    transition: "width 0.3s ease",
  },
  progressText: {
    color: "#52525b",
    fontSize: "14px",
    textAlign: "center",
    margin: 0,
  },

  // Common
  divider: {
    margin: "0",
    border: "none",
    borderTop: "1px solid #e4e4e7",
  },
  footer: {
    padding: "24px",
    textAlign: "center",
    backgroundColor: "#fafafa",
  },
  footerText: {
    color: "#52525b",
    fontSize: "14px",
    margin: "0 0 8px 0",
  },
  footerBrand: {
    color: "#71717a",
    fontSize: "12px",
    margin: 0,
  },
};