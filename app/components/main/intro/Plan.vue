<template>
  <div class="w-full flex flex-col gap-y-6">
    <div class="flex flex-col gap-y-1.5">
      <p class="text-xl font-light break-keep">
        {{ $t('intro.plan') }}
      </p>
      <USeparator />
    </div>
    <PlanList />
  </div>
</template>
