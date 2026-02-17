<template>
<body>
    <Navbar/>

    <!-- <header class="position-sticky top-0 z-3 bg-body"></header> -->
    <main>
        <section id="landing">
            <div class="container  justify-content-center"
                style="width: auto; height: 50vh; margin-top: 60px; padding-left:150px;">
                <div class="row">
                    <div class="col-lg-6 mt-3">
                        <h1>Your Partner in</h1>
                        <h1>Smart <span class="text-success">Financial</span></h1>
                        <h1 class="text-success">Desicions</h1>
                        <p>Take control of your money with tool designed <br> to help you. save more, invest wisely, and
                            plan ahead effortinesily.</p>
                        <div class="d-flex gap-3 mt-4">
                            <router-link to="/financeExpert" href="" class="btn btn-success">Talk to Expert</router-link>
                            <a href="#Contact" class="btn btn-secondary">About Us</a>

                        </div>
                    </div>
                    <div class="col-lg-6">
                        <img src="https://i.pinimg.com/1200x/7b/a7/32/7ba7322f29cb8b9d0339f2bed5b570db.jpg" alt=""
                            class="img-fluid " style="width: 85%; height: 100%;">
                    </div>
                </div>
            </div>
        </section>
        <section id="#companies">
            <div class="container my-5">
                <h6 class="text-center text-muted text-dark">Partner Companies</h6>
                <div class="row partner-logos justify-content-center align-items-center">
                    <div class="col-lg-3">
                        <img src="https://www.temenos.com/wp-content/uploads/2019/02/AcledaBank-logo.png" alt=""
                            class="img-fluid partner-logo">
                    </div>
                    <div class="col-lg-3">
                        <img src="https://ibccambodia.com/wp-content/uploads/2023/09/ABA-Logo-Secondary.png.webp" alt=""
                            class="img-fluid partner-logo">
                    </div>
                    <div class="col-lg-3">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw-StwioUKC8DZta0lDLoVFFEyyK3YPXy2UQ&s"
                            alt="" class="img-fluid partner-logo">
                    </div>
                    <div class="col-lg-3">
                        <img src="https://bongsrey.sgp1.digitaloceanspaces.com/library/961/images/thumbnail/5de9df9bd2e21.png"
                            alt="" class="img-fluid partner-logo">
                    </div>
                </div>
            </div>
        </section>
        <section id="#features">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <span class="badge text-bg-success ">Success</span><br>
                        <h2 class="card-text mt-3">Achieve <span class="text-success">financial clarity <br></span> and
                            take control of<br> your future with tools designed to simplify, <br>streamline, and
                            personalize your <span class="text-info">money <br>management</span> in one platform</h2>
                    </div>
                    <div class="col-lg-4">
                        <small class="text-muted" style="font-size: 10px;">Everything You need.</small>
                        <small class="text-muted" style="font-size: 10px;">Nothing You Don't</small>
                    </div>
                    <div class="col-lg-3 my-4">
                        <div class="card shadow-lg border-0" style="width: 18rem;">
                            <img src="https://i.pinimg.com/1200x/97/5a/27/975a27d9abb7f181155205df952fbe5c.jpg"
                                class="card-img-top" alt="...">
                            <div class="card-body">
                                <div class="card-title "><h3>Finance ChatBot</h3></div>
                                <p class="card-text">Some quick example text to build on the card title and make up the
                                    bulk of the card’s content.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 my-4">
                        <div class="card shadow-lg border-0" style="width: 18rem;">
                            <img src="https://i.pinimg.com/1200x/97/5a/27/975a27d9abb7f181155205df952fbe5c.jpg"
                                class="card-img-top" alt="...">
                            <div class="card-body">
                                <div class="card-title "><h3>Budget Analyzer</h3></div>
                                <p class="card-text">Some quick example text to build on the card title and make up the
                                    bulk of the card’s content.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 my-4">
                        <div class="card shadow-lg border-0" style="width: 18rem;">
                            <img src="https://i.pinimg.com/1200x/97/5a/27/975a27d9abb7f181155205df952fbe5c.jpg"
                                class="card-img-top" alt="...">
                            <div class="card-body">
                                <div class="card-title "><h3>Loan Comparasion</h3></div>
                                <p class="card-text">Some quick example text to build on the card title and make up the
                                    bulk of the card’s content.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 my-4">
                        <div class="card shadow-lg border-0" style="width: 18rem;">
                            <img src="https://i.pinimg.com/1200x/97/5a/27/975a27d9abb7f181155205df952fbe5c.jpg"
                                class="card-img-top" alt="...">
                            <div class="card-body">
                                <div class="card-title "><h3>Saving Plan</h3></div>
                                <p class="card-text">Some quick example text to build on the card title and make up the
                                    bulk of the card’s content.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    </main>
</body>

</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue';

 


</script>
<style scoped>
/* * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
 */
.card-img{
    object-fit:cover;
    margin: auto;
}
/* CSS */
.partner-logos {
  text-align: center;
}

.partner-logo {
 max-width: 200px;
  object-fit: contain;
  filter: grayscale(100%); /* optional: gray logos */
  transition: transform 0.3s, filter 0.3s;
}

.partner-logo:hover {
  transform: scale(1.1);
  filter: grayscale(0%); /* color on hover */
}


</style>