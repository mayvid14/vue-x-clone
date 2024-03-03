<template>
  <div class="h-full flex flex-col">
    <div class="flex-1 flex flex-col lg:flex-row items-center gap-2 lg:gap-0">
      <Icon name="carbon:logo-x" class="text-6xl lg:text-[400px] my-5 flex-none lg:flex-1"></Icon>
      <div class="flex-none lg:flex-1 flex">
        <LoginForm />
      </div>
    </div>
    <LoginFooter />
  </div>
</template>