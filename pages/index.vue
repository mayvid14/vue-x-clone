<template>
  <div class="h-full flex flex-col">
    <div class="flex-1 flex flex-col lg:flex-row items-center gap-2 lg:gap-0">
      <div class="my-5 px-5 lg:px-10 w-full flex-none lg:flex-1 flex justify-start lg:justify-center">
        <Icon name="carbon:logo-x" class="flex-none lg:flex-1 text-6xl lg:text-[400px]"></Icon>
      </div>
      <div class="flex-none lg:flex-1">
        <LoginForm />
      </div>
    </div>
    <LoginFooter />
  </div>
</template>