<script>
  import Router from "svelte-spa-router";
  import routes from "@/routes";
  import "@/static/css/tailwind.css";
  import UserAuth from "@/lib/UserAuthentication.svelte";
</script>

<div class="flex flex-row space-x-4 m-1.5">
  <a href="#/" class="">Home</a>
  <a href="#/browse?p=1">Browse</a>
  <a href="#/upload">Upload</a>
  <a href="#/tag">Tag</a>
  <span>:|:</span>
  <UserAuth />
</div>
<Router {routes} />
