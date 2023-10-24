<script>
	// desn't work here (window issue)
	// import zim from "zimjs"
	import { onMount, onDestroy } from "svelte"

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

	  let text="test phrase"
	  const ajax = new Ajax()
	  const but = new Button(200,60,"CLICK").pos(0,0).tap(()=>{
                zog("clicking");
                ajax.post('?/myform', text, "text", "text")
	  })
    }
  })
	onDestroy(() => {
    frame?.dispose()
  })
</script>






	{num}
	<form method="POST" action="?/myform">
		<input name="data" type="text">
		<button type="submit">send</button>
	</form>
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
