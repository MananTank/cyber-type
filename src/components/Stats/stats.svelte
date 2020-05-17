<script>
   // store
   import stats from '../../stores/stats.js'
   import progress from '../../stores/progress.js'
   import typed from '../../stores/typed.js'
   import words from '../../stores/words.js'
   import targetSpeed from '../../stores/targetSpeed'
   import chaseMode from '../../stores/chaseMode'
   // import targetProgress from './stores/targetProgress'
   // motion
   import {tweened} from 'svelte/motion'
   // utils
   import ms from '../../utils/ms.js'
   // components
   import TargetSlider from './TargetSlider/targetSlider.svelte'

   let wordTypeStart = null
   let speed = tweened(0)
   let time = tweened(0)

   // if begining, note starting time
   $: if ($typed.key && $typed.key !== ' ' && $progress.char === 1 && $progress.word === 0) {
      stats.typingStarted()
   }

   // when a word has been typed, update stats
   $: if ($progress.char === $words[$progress.word].length - 1) {
      stats.log()
   }

   $: $speed = $stats.speed
   $: $time = $stats.time

</script>
<template src='./stats.pug'></template>
<style src='./stats.styl'></style>