<template>
    <div class="col-1-12 col-lg-12 container my-4">

  <div class="card">
    <div class="card-body">

      <h5 class="card-title">
        👥 Expert System Data Collection
      </h5>

      <p class="mb-2">
        Submitted users: {{ users.length }} / 100
      </p>

      <div class="row g-2">

        <div class="col-6">
          <input v-model="userForm.name" class="form-control" placeholder="Name">
        </div>

        <div class="col-6">
          <input v-model="userForm.age" type="number" class="form-control" placeholder="Age">
        </div>

        <div class="col-6">
          <input v-model.number="userForm.income" type="number" class="form-control" placeholder="Income">
        </div>

        <div class="col-6">
          <input v-model.number="userForm.expense" type="number" class="form-control" placeholder="Monthly Expense">
        </div>

      </div>

      <button
        class="btn btn-primary w-100 mt-3"
        @click="submitUser"
        :disabled="users.length >= 10"
      >
        Submit user data
      </button>

      <p v-if="users.length >= 10" class="text-warning mt-2 text-center">
        ✅ 10 users collected. Expert system ready.
      </p>

    </div>
  </div>

</div>
<div class="col-1-12" v-if="users.length === 10">

  <div class="container my-4">

    <div class="row">
      <div class="col-1-12">

        <div class="card">
          <div class="card-body">

            <h5 class="card-title">
              Admin Report – Finance Expert System
            </h5>

            <!-- summary -->
            <div class="row my-3">

              <div class="col-1-12 col-lg-4">
                <div class="card">
                  <div class="card-body text-center">
                    <p class="card-text">Total Users</p>
                    <h5>{{ users.length }} / 100</h5>
                  </div>
                </div>
              </div>

              <div class="col-1-12 col-lg-4">
                <div class="card">
                  <div class="card-body text-center">
                    <p class="card-text">Average Income</p>
                    <h5>${{ avgIncome.toFixed(2) }}</h5>
                  </div>
                </div>
              </div>

              <div class="col-1-12 col-lg-4">
                <div class="card">
                  <div class="card-body text-center">
                    <p class="card-text">Average Expense</p>
                    <h5>${{ avgExpense.toFixed(2) }} </h5>
                  </div>
                </div>
              </div>

            </div>

            <!-- recommendation -->
            <div class="card mb-3">
              <div class="card-body text-center">
                <p class="card-text fw-semibold">
                  Expert System Recommendation
                </p>

                <p class="card-text">
                  {{ recommendation }}
                </p>
              </div>
            </div>

            <!-- table -->
            <div class="table-responsive">

              <table class="table table-bordered text-center align-middle">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Income</th>
                    <th>Expense</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(u, index) in users" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ u.name }}</td>
                    <td>{{ u.age ?? 'N/A' }}</td>
                    <td>${{ u.income }}</td>
                    <td>${{ u.expense }}</td>
                  </tr>

                  <tr v-if="users.length === 0">
                    <td colspan="5">No data</td>
                  </tr>
                </tbody>

              </table>

            </div>

            <button class="btn btn-danger mt-2" @click="clearAll">
              Clear All Data
            </button>

          </div>
        </div>

      </div>
    </div>

  </div>
</div>

</template>
<script setup>
import { ref, reactive, onMounted } from "vue"
import { computed } from "vue"

const users = ref([])

const userForm = reactive({
  name: "",
  age: "",
  income: "",
  expense: ""
})

function submitUser() {

  if (
    !userForm.name ||
    !userForm.age ||
    !userForm.income ||
    !userForm.expense
  ) {
    alert("Please fill all user data")
    return
  }

  if (users.value.length >= 100) {
    alert("Already collected 10 users")
    return
  }

  users.value.push({
    name: userForm.name,
    age: userForm.age,
    income: userForm.income,
    expense: userForm.expense,
    createdAt: new Date().toISOString()
  })

localStorage.setItem(
  "financeUsers",
  JSON.stringify([
    { name, age, income, expense }
  ])
)

  userForm.name = ""
  userForm.age = ""
  userForm.income = ""
  userForm.expense = ""
}
onMounted(() => {
  const storedUsers = localStorage.getItem("expertUsers")
  if (storedUsers) {
    users.value = JSON.parse(storedUsers)
  }
})
const avgIncome = computed(() => {
  if (users.value.length === 0) return 0

  const total = users.value.reduce(
    (sum, u) => sum + Number(u.income),
    0
  )

  return total / users.value.length
})
const avgExpense = computed(() => {
  if (users.value.length === 0) return 0

  const total = users.value.reduce(
    (sum, u) => sum + Number(u.expense),
    0
  )

  return total / users.value.length
})
const recommendation = computed(() => {

  if (users.value.length < 100)
    return "Not enough data"

  if (avgExpense.value > avgIncome.value * 0.8) {
    return "High spending behavior. Recommend expense reduction plan."
  }

  if (avgExpense.value < avgIncome.value * 0.5) {
    return "Good financial health. Recommend savings and investment plan."
  }

  return "Moderate financial behavior. Recommend balanced financial planning."
})

</script>