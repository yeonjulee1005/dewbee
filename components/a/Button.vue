<script setup lang="ts">
withDefaults(
  defineProps<{
    customClass?: string
    customStyle?: { [key: string]: string } | string
    buttonRounded?: string
    buttonDisabled?: boolean
    buttonPadding?: boolean
    buttonBlock?: boolean
    buttonTruncate?: boolean
    buttonType?: 'button' | 'submit' | 'reset'
    buttonColor?: 'primary' | 'neutral' | 'secondary' | 'success' | 'info' | 'warning' | 'error'
    buttonSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    buttonVariant?: 'solid' | 'link' | 'outline' | 'soft' | 'subtle' | 'ghost'
    useLeading?: boolean
    useTrailing?: boolean
    iconLeadName?: string
    iconLeadClass?: string
    iconTrailName?: string
    iconTrailClass?: string
    imageUrl?: string
    imageSize?: number
    buttonText?: string
  }>(),
  {
    hideTooltip: false,
    customClass: '',
    customStyle: '',
    buttonRounded: '',
    buttonDisabled: false,
    buttonPadding: true,
    buttonBlock: false,
    buttonTruncate: false,
    buttonColor: 'primary',
    buttonSize: 'sm',
    buttonType: 'button',
    buttonVariant: 'solid',
    useLeading: false,
    useTrailing: false,
    iconLeadName: '',
    iconLeadClass: 'w-8 h-8',
    iconTrailName: '',
    iconTrailClass: 'w-8 h-8',
    imageUrl: '',
    imageSize: 30,
    buttonText: '',
  },
)
</script>

<template>
  <UButton
    :class="customClass"
    :ui="{ base: buttonRounded ? buttonRounded : 'rounded-md' }"
    :disabled="buttonDisabled"
    :block="buttonBlock"
    :truncate="buttonTruncate"
    :padded="buttonPadding"
    :color="buttonColor"
    :size="buttonSize"
    :type="buttonType"
    :variant="buttonVariant"
    :label="buttonText"
    :aria-label="buttonText"
  >
    <template
      v-if="useLeading"
      #leading
    >
      <Icon
        v-if="iconLeadName"
        :name="iconLeadName"
        :class="iconLeadClass"
      />
      <NuxtImg
        v-if="imageUrl"
        :src="imageUrl"
        :width="imageSize"
      />
    </template>
    <template
      v-if="useTrailing"
      #trailing
    >
      <Icon
        v-if="iconTrailName"
        :class="iconTrailClass"
        :name="iconTrailName"
      />
    </template>
  </UButton>
</template>
