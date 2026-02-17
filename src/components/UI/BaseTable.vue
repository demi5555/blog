<template>
    <div class="container-fluid p-4">
        <table class="table">
            <thead class=" text-center">
                <tr>
                    <th v-for="col in columns" :key="col.key">
                        {{ col.label }}
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
    <!-- <tbody>
            <tr v-for="n in 5" :key="n">
                <td :colspan="columns.length + 1">
                    <div class="placeholder-glow">
                        <span class="placeholder bg-secondary col-12"></span>
                    </div>
                </td>
            </tr>
      </tbody> -->

            <tbody class="text-center">
                <tr v-for="row in rows" :key="row.id">

                    <td v-for="col in columns" :key="col.key" class="text-center">
                        <slot :name="`col-${col.key}`" :row="row" :value="row[col.key]">
                            {{ row[col.key] }}
                        </slot>
                    </td>

                    <!-- ✅ action column -->
                    <td class="text-center">
                        <div class="d-flex justify-content-center gap-2">
                            <button class="btn btn-sm btn-primary" @click="$emit('edit', row)">
                                Edit
                            </button>

                            <button class="btn btn-sm btn-danger" @click="$emit('delete', row)">
                                Delete
                            </button>
                        </div>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
const props = defineProps({
    rows: {
        type: Array,
        default: () => []
    },
    columns: {
        type: Array,
        default: () => []
    }
});
defineEmits(['delete', 'edit']);

</script>
<style scoped>
/* header */
.table thead {
    background: linear-gradient(to right, #4bc0c8, #6a11cb);
}

.table thead th {
    font-weight: 600;
    padding: 14px 12px;
    border: 1px solid rgb(211, 197, 197);
}

/* body rows */
.table tbody td {
    padding: 12px;
    vertical-align: middle;
    border-top: 1px solid rgb(211, 197, 197);
    border: 1px solid rgb(211, 197, 197);
    color: #2d3436;
    font-size: 0.95rem;
}

/* hover effect */
.table tbody tr:hover {
    background: rgba(75, 192, 200, 0.08);
}

/* action buttons */
.table .btn-primary {
    background: #6a11cb;
    border: none;
}

.table .btn-danger {

    background: #ff4d6d;
    border: none;
}

/* container spacing & soft shadow */
.container-fluid {
    border-radius: 18px;
}

/* make action column center nicely */
.table td.d-flex {
    align-items: center;
}
</style>