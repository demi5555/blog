<template>
<Navbar/>
  <section class="hero-banner text-center py-5 bg-light">
    <div class="container hero-content">
      <h1 class="mb-3">Personal Finance Expert System</h1>
      <p class="text-muted">
        Chat • Analyze budget • Compare loans • Plan your savings
      </p>
    </div>
  </section>

  <div class="container my-4 ">
    <div class="row g-4 d-flex justify-content-center">

      <!-- ================= CHATBOT ================= -->
      <div id="chat" class="col-1-12 col-lg-6  align-items-center">
        <div class="card">
          <div class="card-body">

            <h5 class="card-title"> Finance Advisor</h5>

            <div
              class="chat-box border rounded p-2 mb-3"
              style="height:220px;overflow:auto"
              ref="chatBoxRef"
            >
              <div v-for="(c,i) in chats" :key="i" :class="c.type" class="mb-1">
                {{ c.text }}
              </div>
            </div>

            <div class="input-group">
              <input
                v-model="chatInput"
                class="form-control"
                placeholder="Ask about loan, budget, savings..."
                @keydown.enter="sendMessage"
              >
              <button class="btn btn-primary" @click="sendMessage">Send</button>
            </div>

          </div>
        </div>
      </div>
    </div>

      <!-- ================= BUDGET ================= -->
     <div class="row g-4 d-flex justify-content-center my-3">
 
      <div id="budget" class="  col-1-12 col-lg-6" v-if="activeSection === 'budget'">
        <div class="card">
          <div class="card-body">

            <h5 class="card-title">📊 Budget Analyzer</h5>

            <div class="row g-2">
              <div class="col-6">
                <input v-model.number="budget.income" type="number" min="0" class="form-control" placeholder="Income">
              </div>
              <div class="col-6">
                <input v-model.number="budget.rent" type="number" min="0" class="form-control" placeholder="Rent">
              </div>
              <div class="col-6">
                <input v-model.number="budget.food" type="number" min="0" class="form-control" placeholder="Food">
              </div>
              <div class="col-6">
                <input v-model.number="budget.transport" type="number" min="0" class="form-control" placeholder="Transport">
              </div>
              <div class="col-12">
                <input v-model.number="budget.others" type="number" min="0" class="form-control" placeholder="Others">
              </div>
            </div>

            <button class="btn btn-success w-100 mt-3" @click="analyzeBudget">Analyze</button>

            <p class="mt-3 text-center fw-semibold">{{ budgetResult }}</p>

            <canvas ref="budgetChartRef" class="mt-2"></canvas>

          </div>
        </div>
      </div>
     </div>
      <!-- ================= LOAN ================= -->
     <div class="row g-4 d-flex justify-content-center my-3">

      <div id="loan" class="col-1-12 col-lg-6" v-if="activeSection === 'loan'">
        <div class="card glass">
          <div class="card-body">

            <h5 class="card-title">💳 Loan Comparison</h5>

            <div class="row g-2 mb-3">
              <div class="col-6">
                <input
                  v-model="loan.amount"
                  type="number"
                  min="1"
                  class="form-control"
                  placeholder="Loan amount"
                >
              </div>

              <div class="col-6">
                <input
                  v-model="loan.months"
                  type="number"
                  min="1"
                  class="form-control"
                  placeholder="Months"
                >
              </div>
            </div>

            <table
              class="table table-bordered text-center table-dark-glass"
              v-if="loan.amount > 0 && loan.months > 0"
            >
              <thead>
                <tr>
                  <th>Institution</th>
                  <th>Interest</th>
                  <th>Monthly</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(r,i) in calculatedLoans"
                  :key="i"
                  :class="{ 'highlight': r.monthlyPayment === lowestPayment }"
                >
                  <td>{{ r.bank }}</td>
                  <td>{{ r.rate }}%</td>
                  <td>${{ r.monthlyPayment.toFixed(2) }}</td>
                  <td>${{ r.totalPaid.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
     </div>
      <!-- ================= SAVINGS ================= -->
    <div class="row g-4 d-flex justify-content-center my-3">

      <div id="savings" class="col-1-12 col-lg-6" v-if="activeSection === 'savings'">
        <div class="card">
          <div class="card-body">

            <h5 class="card-title">💰 Savings Planner</h5>

            <input v-model="savings.goal" type="text"  class="form-control mb-2" placeholder="Savings Goal">
            <input v-model="savings.years" type="text" class="form-control mb-2" placeholder="Years">
            <input v-model="savings.current" type="text"  class="form-control mb-2" placeholder="Current Savings">

            <button class="btn btn-warning w-100" @click="planSavings">Calculate</button>

            <p class="mt-3 text-center fw-semibold">{{ savingsResult }}</p>

            <canvas ref="savingsChartRef" class="mt-2"></canvas>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted } from "vue"
import Chart from "chart.js/auto"
import Navbar from "@/components/layout/Navbar.vue"


/* ================= CHAT ================= */
const chatInput = ref("")
const chats = ref([])
const chatBoxRef = ref(null)
let activeSection = ref(" ")


function sendMessage() {
  if (!chatInput.value.trim()) return
  const msg = chatInput.value.toLowerCase()
  chats.value.push({ type: "user", text: msg })

  if (msg.includes("loan")) {
    chats.value.push({ type: "bot", text: "💳 Showing loan comparison below." })
    activeSection.value = "loan"
  } else if (msg.includes("budget")) {
    chats.value.push({ type: "bot", text: "📊 Showing budget analyzer below." })
    activeSection.value = "budget"
  } else if (msg.includes("saving")) {
    chats.value.push({ type: "bot", text: "💰 Showing savings planner below." })
    activeSection.value = "savings"
  } else {
    chats.value.push({ type: "bot", text: "❓ Try: loan, budget or savings." })
    activeSection.value = ""
  }

  chatInput.value = ""
  nextTick(() => {
    chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight
  })
}

/* ================= BUDGET ================= */
const budget = reactive({ income: 0, rent: 0, food: 0, transport: 0, others: 0 })
const budgetResult = ref("")
const budgetChartRef = ref(null)
let budgetChart = null

function analyzeBudget() {
  if (!budget.income || budget.income <= 0) { alert("Please enter income"); return }

  const total = budget.rent + budget.food + budget.transport + budget.others
  const remaining = budget.income - total
  budgetResult.value = `Total Expense: $${total.toFixed(2)} | Remaining: $${remaining.toFixed(2)}`

  if (budgetChart) budgetChart.destroy()
  budgetChart = new Chart(budgetChartRef.value, {
    type: "pie",
    data: { labels: ["Rent","Food","Transport","Others"], datasets: [{ data: [budget.rent,budget.food,budget.transport,budget.others] }] }
  })
}

/* ================= LOAN ================= */
const loan = reactive({ amount: "", months: "" })
const banks = [
  { bank: "ABA Bank", rate: 14.4 },
  { bank: "ACLEDA Bank", rate: 15 },
  { bank: "Maybank Cambodia", rate: 12 },
  { bank: "Phillip Bank", rate: 12.5 },
]

const calculatedLoans = computed(() => {
  const P = parseFloat(loan.amount)
  const n = parseInt(loan.months)
  if (!P || !n || P <= 0 || n <= 0) return []

  return banks.map((b) => {
    const r = b.rate / 100 / 12
    const monthlyPayment = (r * P) / (1 - Math.pow(1 + r, -n))
    const totalPaid = monthlyPayment * n
    return { bank: b.bank, rate: b.rate, monthlyPayment, totalPaid }
  })
})

const lowestPayment = computed(() => {
  if (!calculatedLoans.value.length) return 0
  return Math.min(...calculatedLoans.value.map((l) => l.monthlyPayment))
})

/* ================= SAVINGS ================= */
const savings = reactive({ goal: 0, years: 0, current: 0 })
const savingsResult = ref("")
const savingsChartRef = ref(null)
let savingsChart = null

function planSavings() {
  if (!savings.goal || !savings.years) { alert("Please enter goal and years"); return }

  const monthsCount = savings.years * 12
  const remaining = savings.goal - savings.current
  const monthly = remaining / monthsCount
  savingsResult.value = `You need to save $${monthly.toFixed(2)} per month`

  if (savingsChart) savingsChart.destroy()
  savingsChart = new Chart(savingsChartRef.value, {
    type: "bar",
    data: { labels: ["Monthly Saving"], datasets: [{ label: "$ Required", data: [monthly.toFixed(2)] }] }
  })
}

/* ================= LOAD LOCAL STORAGE ================= */
onMounted(() => {
  // Budget
  budget.income = (localStorage.getItem("income"))
  budget.rent = (localStorage.getItem("rent"))
  budget.food = (localStorage.getItem("food"))
  budget.transport = (localStorage.getItem("transport") )
  budget.others = (localStorage.getItem("others"))

  // Savings
  savings.goal = (localStorage.getItem("goal") )
  savings.years = (localStorage.getItem("years") )
  savings.current = (localStorage.getItem("currentSavings") )

  // Loan
  loan.amount = (localStorage.getItem("loanAmount") || "")
  loan.months = (localStorage.getItem("loanMonths") || "")
})
</script>

<style scoped>
input.form-control { padding:0.5rem; font-size:1rem }
table { width:100%; border-collapse:collapse }
th, td { padding:0.75rem; border:1px solid #ddd }
.highlight { background-color:#d4edda; font-weight:bold }
.hero-banner { background:#f8f9fa }
.glass { background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); border-radius:10px; }
</style>
