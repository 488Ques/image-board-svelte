<script>
    import { user } from "@/stores";
</script>

<svelte:head>
    <title>User</title>
</svelte:head>

<ul>
    <li>ID: {$user.id}</li>
    <li>Username: {$user.username}</li>
    <li>Is privileged?: {$user.privileged}</li>
    <li>Secret: {$user.secret}</li>
</ul>
