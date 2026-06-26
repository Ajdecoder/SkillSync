import React from "react"
import Back from "../common/Back"
import PriceCard from "../home/price/PriceCard"
import "../home/price/price.css"

const pricingPlans = [
  {
    best: "Basic",
    plan: "Starter",
    package_price: "19",
    ptext: "For individuals and small teams",
    list: [
      { icon: "✓", text: "Basic Contract Management" },
      { icon: "✓", text: "Email Support" },
      { icon: "✓", text: "Guides & Tips Access" },
      { icon: "✕", text: "Priority Support", change: "color" },
    ],
  },
  {
    best: "Popular",
    plan: "Standard",
    package_price: "49",
    ptext: "Perfect for growing teams",
    list: [
      { icon: "✓", text: "Advanced Contract Management" },
      { icon: "✓", text: "Employee Support" },
      { icon: "✓", text: "Partner Resources" },
      { icon: "✓", text: "Priority Support" },
    ],
  },
  {
    best: "Pro",
    plan: "Enterprise",
    package_price: "99",
    ptext: "For companies that need scale",
    list: [
      { icon: "✓", text: "Unlimited Contract Management" },
      { icon: "✓", text: "Dedicated Account Manager" },
      { icon: "✓", text: "Custom Workflows" },
      { icon: "✓", text: "24/7 Premium Support" },
    ],
  },
]

const Pricing = () => {
  return (
    <section className="pricing mb-1">
      <Back
        name="30 days money back guarantee"
        title="No Extra Fees. Friendly Support"
      />

      <div className="price container">
        {pricingPlans.map((item, index) => (
          <PriceCard key={index} {...item} />
        ))}
      </div>
    </section>
  )
}

export default Pricing