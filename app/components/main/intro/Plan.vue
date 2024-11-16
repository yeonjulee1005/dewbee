<template>
  <div class="w-full flex flex-col gap-y-6">
    <div class="flex flex-col gap-y-1.5">
      <p class="text-xl font-light break-keep">
        <span>
          {{ $t('intro.plan.description') }}
        </span>
        <span class="text-3xl font-semibold ml-2 mr-1">
          {{ $t('text.free') }}
        </span>
        <span>
          {{ $t('intro.plan.descriptionEnd') }}
        </span>
      </p>
      <USeparator />
    </div>
    <PlanList clickable />
  </div>
</template>
