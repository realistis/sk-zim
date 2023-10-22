<script>
	// desn't work here (window issue)
	// import zim from "zimjs"
	// 
	import { onMount, onDestroy } from "svelte"
	import Counter from "./Counter.svelte"
  import welcome from "$lib/images/svelte-welcome.webp"
  import welcome_fallback from "$lib/images/svelte-welcome.png"
  //   import zim from "zimjs"

  //   import { Frame } from "zimjs"
  let num = 0
  let frame
  let temp
  let rnd = () => {
    num = Math.round(Math.random() * 1000)
  }

  $: if (num) {
    console.log("updating frame")
    if (temp && frame) {
      temp.text = num
      frame?.stage?.update()
    }
    console.log("after frame")
  }

  onMount(async () => {
    //works
    await import("zimjs")
    zim.zimplify()

    rnd()
    frame = new Frame("zim", 1024, 268, white, black, ready)
    function ready() {
      temp = new Label({
        text: num,
        size: 36,
      })
      temp.center()
      frame.stage.update()
    }
  })
	onDestroy(() => {
    frame?.dispose()
  })
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />
	{num}
	<form>
		<button on:click={rnd}>Refresh</button>
	</form>
</section>
<div id="zim" />

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
