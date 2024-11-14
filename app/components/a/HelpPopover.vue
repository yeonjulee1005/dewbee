<script setup lang="ts">
const { isMobile } = useDevice()

const props = withDefaults(
  defineProps<{
    popoverMode?: 'hover' | 'click'
    helpCustomClass?: string
    iconCustomClass?: string
    helpLabel?: string
    helpIcon?: string
    popoverArrow?: boolean
    popoverAlign?: 'start' | 'center' | 'end'
    popoverSide?: 'top' | 'bottom' | 'left' | 'right'
    customClass?: string
    useTrailing?: boolean
    buttonVariant?: 'solid' | 'link' | 'outline' | 'soft' | 'subtle' | 'ghost'
    buttonColor?: 'primary' | 'secondary' | 'neutral' | 'error' | 'success' | 'warning'
  }>(),
  {
    popoverMode: 'hover',
    helpCustomClass: 'px-3 py-2',
    iconCustomClass: 'h-5 w-5 text-neutral-600 dark:text-neutral-400',
    helpLabel: '',
    helpIcon: 'i-lucide-info',
    popoverArrow: true,
    popoverAlign: 'start',
    popoverSide: 'bottom',
    customClass: '',
    useTrailing: true,
    buttonVariant: 'ghost',
    buttonColor: 'neutral',
  },
)

const computedPopoverControl = computed(() => {
  return isMobile ? 'click' : props.popoverMode
})
</script>

<template>
  <UPopover
    :mode="computedPopoverControl"
    :arrow="popoverArrow"
    :content="{ align: popoverAlign, side: popoverSide, sideOffset: 4 }"
    :ui="{ content: helpCustomClass }"
  >
    <AButton
      :class="customClass"
      :use-trailing="useTrailing"
      :button-text="helpLabel"
      :icon-trail-name="helpIcon"
      :button-color="buttonColor"
      :icon-trail-class="iconCustomClass"
      :button-variant="buttonVariant"
    />
    <template #content>
      <slot />
    </template>
  </UPopover>
</template>
