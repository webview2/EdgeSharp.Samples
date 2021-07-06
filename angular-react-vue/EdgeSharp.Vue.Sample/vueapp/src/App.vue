<template>
  <div id="app">
    <header>
        <!-- Responsive navbar-->
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container">
                <a class="navbar-brand" href="#">EdgeSharp</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                          <a class="nav-link" href="javascript:void(0);" @click="navigateTo('/home')">home</a>
                        </li>
                      <li class="nav-item">
                          <a class="nav-link" href="javascript:void(0);" @click="navigateTo('/tmdbmovies')">tmdb movies</a>
                      </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">ipc options</a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                              <li><a class="dropdown-item" href="javascript:void(0);" @click="changeIpcOption('hostobject')"><input name="ipcoption" type="radio" value="hostobject" v-model="ipcOption" /><span> host object</span></a></li>
                              <li><a class="dropdown-item" href="javascript:void(0);" @click="changeIpcOption('httpclient')"><input name="ipcoption" type="radio" value="httpclient" v-model="ipcOption" /><span> http client</span></a></li>
                              <li><a class="dropdown-item" href="javascript:void(0);" @click="changeIpcOption('postmessage')"><input name="ipcoption" type="radio" value="postmessage" v-model="ipcOption" /><span> post message</span></a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">exit</a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="http://edgesharp.com/reload">reload</a></li>
                                <li><a class="dropdown-item" href="http://edgesharp.com/exit">exit</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <div class="container">
        <router-view />
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      ipcOption: ''
    };
  },
  methods:{
    navigateTo(lkPath){
      this.$router.push(lkPath);
    },
    changeIpcOption(ipctype) {
      window.$ipcoption = ipctype;
      this.ipcOption = window.$ipcoption;
    }
  },
  mounted(){
    this.ipcOption = window.$ipcoption;
  }
}
</script>