<script lang="ts">
	import Logo from "$components/Logo.svelte";
	import { onMount } from "svelte";
	import strings from "$lib/data/strings.json";
	import odyssey from "$assets/cards/Super-Mario-Odyssey.jpg";
	import ScrollIcon from "$components/ScrollIcon.svelte";
	import totk from "$assets/cards/totk.webp";
	import scarletviolet from "$assets/cards/scarlet-violet.webp";
	import CardCarousel from "$components/CardCarousel.svelte";
	import Wordmark from "$components/Wordmark.svelte";

	let logoSizes = {
		small: 256,
		large: 378,
	};

	let logoSize = logoSizes.large;

	onMount(() => {
		function onResize() {
			if (window.innerWidth < 625) {
				logoSize = logoSizes.small;
			} else {
				logoSize = logoSizes.large;
			}
		}

		onResize();
		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("resize", onResize);
		};
	});
</script>

<div class="page">
	<div class="contents-container">
		<Logo size={logoSize} />
		<div class="hero-text">
			<h1 class="hero-header">
				<Wordmark size={80} />
			</h1>
			<p>
				{strings.landingOne}
			</p>
		</div>
	</div>
	<div class="below">
		<div class="absolute-center">
			<h1>We care about preservation...</h1>
			<CardCarousel
				cards={[
					{
						title: "Super Mario Odyssey",
						compatibility: "goated",
						image: odyssey,
						releaseYear: 2017,
					},
					{
						title: "The Legend of Zelda: Tears of the Kingdom",
						compatibility: "based",
						image: totk,
						releaseYear: 2023,
					},
					{
						title: "Pokémon Scarlet and Pokémon Violet",
						compatibility: "cringe",
						image: scarletviolet,
						releaseYear: 2022,
					},
				]}
			/>
			<div class="instructions">
				<div class="key">Shift</div>
				<span class="plus">+</span>
				<ScrollIcon size={48} color="#bebbdd" />
			</div>
			<p>
				...so we're setting out to continue the beloved Yuzu emulator, as a non-profit drive
				for hardware preservation and research.
			</p>
			<div class="buttons">
				<button
					on:click={() =>
						window.open("https://git.suyu.dev/suyu/suyu", "_blank", "noopener noreferrer")}
					class="download">Git Repo</button
				>
				<button
					class="discord"
					on:click={() => window.open("https://discord.gg/suyu", "_blank", "noopener noreferrer")}
					>Discord</button
				>
			</div>
		</div>
	</div>
</div>

<style>
	.buttons {
		display: flex;
		justify-content: center;
		gap: 16px;
		margin-top: 20px;
	}

	.instructions {
		display: flex;
		align-items: center;
		margin-top: 24px;
		opacity: 0.25;
		position: absolute;
		top: calc(100% - 162px);
		left: 50%;
		transform: translateX(-50%);
	}

	.plus {
		margin-left: 15px;
	}

	.plus,
	.key {
		margin-top: -14px;
	}

	.key {
		font-size: 12px;
		background-color: rgb(59, 55, 78);
		border-radius: 4px;
		border: solid 1px rgb(137, 129, 176);
		padding: 4px 12px;
	}

	.contents-container {
		width: calc(100vw - 17px);
		height: calc(100vh - 160px);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 96px;
		box-sizing: border-box;
		padding-right: 128px;
	}

	.hero-header {
		margin-top: -2rem;
		margin-bottom: 2rem;
	}

	.hero-text {
		max-width: 400px;
	}

	@media (max-width: 625px) {
		.contents-container {
			flex-direction: column;
			gap: 96px;
			padding-right: 0;
			text-align: center;
			padding-left: 16px;
		}
	}

	@media (max-width: 560px) {
		.absolute-center {
			position: relative !important;
			transform: none !important;
			left: 0 !important;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.instructions {
			display: none;
		}
	}

	.below {
		width: 100%;
		min-height: calc(106vh - 80px);
		height: fit-content;
		padding-bottom: 80px;
		position: relative;
	}

	.absolute-center {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.absolute-center > h1 {
		text-align: center;
		margin-bottom: 18px;
		margin-top: 36px;
	}

	.absolute-center > p {
		text-align: center;
		margin-top: 64px;
	}
</style>
