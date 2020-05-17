<script>
  import {onMount} from 'svelte'
  // components
  import Words from './components/Words/words.svelte';
  import Stats from './components/Stats/stats.svelte';
  import Keys from './components/Keys/keys.svelte';
  // utils
  import themeChanger from './utils/theme.js'
  // stores
  import chaseMode from './stores/chaseMode'
  import typed from './stores/typed'
  import errors from './stores/errors'
  import progress from './stores/progress'
  import targetProgress from './stores/targetProgress'
  import keys from './stores/keys'
  import stats from './stores/stats'

  // apply first theme in array of themes
  onMount(themeChanger)

  function handleReset() {
    typed.reset()
    errors.reset()
    progress.reset()
    targetProgress.reset()
    targetProgress.stop()
    keys.reset()
    stats.reset()
  }


</script>

<template src="./App.pug" />
<style src="./App.styl"> </style>
