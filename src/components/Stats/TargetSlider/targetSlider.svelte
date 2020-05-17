<script>
   import targetSpeed from '../../../stores/targetSpeed';
   const min = 20
   const max = 150
   let bubble ;

   const handleChange = (e) => {
      targetSpeed.setSpeed(e.target.value)
   }

   // when the targetSpeed changes, change the bubble the position
   $: {
      const offset = ($targetSpeed - min)/(max-min)*100;
      if (bubble) {
         bubble.style.left = offset + '%'
         bubble.style.animationDuration = 50 / (offset + 10) + 's'
      }
   }

</script>
<template src="./targetSlider.pug"> </template>
<style src='./targetSlider.styl'> </style>