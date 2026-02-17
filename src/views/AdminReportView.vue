<template>
    <Navbar/>
    <div class="d-flex">
        <Sidebar />
    <div class="flex-grow-1 content row mt-5" >
              <div class="row mb-4">
        <div class="col-md-3">
          <div class="card p-3">
            <h6>Total Diagnoses</h6>
            <h3 class="fw-bold">120</h3>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card p-3">
            <h6>Register User</h6>
            <h3 class="fw-bold text-success">85</h3>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card p-3">
            <h6>Disease Types</h6>
            <h3 class="fw-bold text-warning">35</h3>
          </div>
        </div>
                <div class="col-md-3">
          <div class="card p-3">
            <h6>Knowledge Rule
            </h6>
            <h3 class="fw-bold text-warning">50</h3>
          </div>
        </div>

      </div>

    <div class="col-lg-3 my-4">
        <div class="card shadow-lg border-0" style="width: 18rem;">
            <img src="https://i.pinimg.com/1200x/97/5a/27/975a27d9abb7f181155205df952fbe5c.jpg" class="card-img-top"
                alt="...">
            <div class="card-body">
                <div class="card-title ">
                    <h3>Disease Management</h3>
                </div>
                <p class="card-text">Some quick example text to build on the card title and make up the
                    bulk of the card’s content.</p>
            </div>
        </div>
    </div>
    <div class="col-lg-3 my-4">
        <div class="card shadow-lg border-0" style="width: 18rem;">
            <img src="https://i.pinimg.com/1200x/97/5a/27/975a27d9abb7f181155205df952fbe5c.jpg" class="card-img-top"
                alt="...">
            <div class="card-body">
                <div class="card-title ">
                    <h3>Knowledge Base</h3>
                </div>
                <p class="card-text">Some quick example text to build on the card title and make up the
                    bulk of the card’s content.</p>
            </div>
        </div>
    </div>
    <div class="col-lg-3 my-4">
        <div class="card shadow-lg border-0" style="width: 18rem;">
            <img src="https://i.pinimg.com/1200x/97/5a/27/975a27d9abb7f181155205df952fbe5c.jpg" class="card-img-top"
                alt="...">
            <div class="card-body">
                <div class="card-title ">
                    <h3>User Management</h3>
                </div>
                <p class="card-text">Some quick example text to build on the card title and make up the
                    bulk of the card’s content.</p>
            </div>
        </div>
    </div>
    <div class="col-lg-3 my-4">
        <div class="card shadow-lg border-0" style="width: 18rem;">
            <img src="https://i.pinimg.com/1200x/97/5a/27/975a27d9abb7f181155205df952fbe5c.jpg" class="card-img-top"
                alt="...">
            <div class="card-body">
                <div class="card-title ">
                    <h3>Reports</h3>
                </div>
                <p class="card-text">Some quick example text to build on the card title and make up the
                    bulk of the card’s content.</p>
            </div>
        </div>
    </div>
    </div>
    </div>





</template>
<script setup>
import Navbar from '@/components/layout/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';

</script>