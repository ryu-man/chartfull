<script lang="ts">
    import { Popover } from '$lib/ui'

    export let open = false
</script>

<Popover bind:open>
    <div>
        Hello world
    </div>
</Popover>
