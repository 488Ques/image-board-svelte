<script>
    import { fetchAPI } from "@/static/js/helper";
    import { paths } from "@/static/js/paths";
    import { user } from "@/stores";

    let secret = "";

    async function login() {
        try {
            let userInfo = await fetchAPI(paths.UserThis, {
                headers: { secret: secret },
            });
            user.set({
                id: userInfo.id,
                privileged: userInfo.privileged,
                username: userInfo.username,
                secret: secret,
            });
            localStorage.setItem("user", JSON.stringify($user));
            secret = "";
        } catch {
            alert("Login failed!");
        }
    }
    function logout() {
        user.set({
            id: "",
            privileged: "",
            username: "",
            secret: "",
        });
        localStorage.setItem("user", JSON.stringify($user));
    }
</script>

{#if $user.secret === ""}
    <input type="text" class="border-2 border-gray-300" bind:value={secret} />
    <button on:click={login} class="hover:opacity-60">Login</button>
{:else}
    <span>Welcome, user <strong>{$user.username}</strong></span>
    <button on:click={logout} class="hover:opacity-60">Logout</button>
{/if}
