<script lang="ts">
	import "../app.pcss";
	import { goto } from "$app/navigation";
	import BackgroundProvider from "$components/BackgroundProvider.svelte";
	import LogoWithTextHorizontal from "$components/LogoWithTextHorizontal.svelte";
	import { page } from "$app/stores";
	import "$lib/css/index.css";
	import { Button } from "flowbite-svelte";
	import { CodeBranchOutline, DiscordSolid, DownloadOutline } from "flowbite-svelte-icons";

	const excludedRoutesNav = ["/mockup/boot", "/mockup/w11"];
	const excludedRoutesBg = ["/mockup", "/mockup/w11"];
	console.log($page.url);
	$: isNavExcluded = excludedRoutesNav.some((route) => $page.url?.pathname.startsWith(route));
	$: isBgExcluded = excludedRoutesBg.some((route) => $page.url?.pathname === route);
</script>

{#if !isNavExcluded}
	<div class="header">
		<div class="left">
			<LogoWithTextHorizontal on:click={() => goto("/")} size={50} />
		</div>
		<div class="right">
			<a href="https://git.suyu.dev/suyu/suyu" target="_blank" rel="noopener noreferrer">
				<Button class="!p-2" pill={true}>
					<CodeBranchOutline />
				</Button>
			</a>
			<a href="https://discord.gg/suyu" target="_blank" rel="noopener noreferrer">
				<Button class="!p-2" pill={true}>
					<DiscordSolid />
				</Button>
			</a>
		</div>
	</div>
{/if}

{#if !isBgExcluded}
	<BackgroundProvider size={80} gap={12} speed={1}></BackgroundProvider>
	<div class="below">
		<div class="page-contents">
			<slot />
		</div>
		<div class="bullshit-flex-container">
			<div class="bullshit-flex-placeholder"></div>
			<div class="bg-below-gradient"></div>
		</div>
	</div>
{:else}
	<slot />
{/if}

<style>
	.below {
		z-index: 5;
		position: relative;
		display: flex;
		flex-direction: column;
	}
	.header {
		position: sticky;
		/* on overscroll, stick to the top */
		overscroll-behavior: contain;
		top: 0;
		left: 0;
		width: 100%;
		height: 80px;
		background-color: color-mix(in srgb, var(--color-primary), transparent 50%);
		border-bottom: var(--border-primary);
		z-index: 1000;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		align-items: center;
		display: flex;
		padding: 0 32px 0 16px;
	}

	.bullshit-flex-container {
		display: flex;
		height: 100%;
		width: 100%;
		position: absolute;
		flex-direction: column;
		z-index: -1;
	}

	.bullshit-flex-placeholder {
		/* 100vh height */
		height: calc(100vh - 162px);
		width: 100%;
	}

	.bg-below-gradient {
		width: 100%;
		flex-grow: 1;
		flex-shrink: 0;
		background-color: var(--page-bg);
		background-size: 100% 100%;
		z-index: -1;
	}

	.left {
		display: flex;
		align-items: center;
		flex-grow: 1;
	}

	.right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
