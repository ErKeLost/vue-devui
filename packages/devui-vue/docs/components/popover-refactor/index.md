# PopoverRefactor 弹出框

// todo 组件描述

#### 何时使用

// todo 使用场景描述

### 基本用法

:::demo // todo 基本用法描述

```vue
<template>
  <div class="demo-popover-refactor-basic">
    <d-popover-refactor>
      <div id="reference"></div>
      <template #content>
        <div id="floating">Tooltip</div>
      </template>
    </d-popover-refactor>
    <d-popover-refactor trigger="manually" :show="show">
      <div id="reference"></div>
      <template #content>
        <div id="floating">Tooltip</div>
      </template>
    </d-popover-refactor>
    <d-button @click="change">按钮</d-button>
    <d-popover-refactor trigger="hover" :mouse-enter-delay="1500">
      <div id="reference"></div>
      <template #content>
        <div id="floating">Tooltip</div>
      </template>
    </d-popover-refactor>
    <d-popover-refactor trigger="hover" :mouse-leave-delay="2000">
      <div id="reference"></div>
      <template #content>
        <div id="floating">Tooltip</div>
      </template>
    </d-popover-refactor>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const show = ref(false);
    function change() {
      show.value = !show.value;
    }
    return {
      show,
      change,
    };
  },
});
</script>

<style lang="scss">
.demo-popover-refactor-basic {
  // css
  #reference {
    width: 100px;
    height: 100px;
    border: 2px dashed black;
    margin: 0;
  }
}
#floating {
  background: #fab1a0;
  padding: 0.5rem;
  border: 1px dash gray;
  color: white;
  width: 60px;
}
</style>
```

:::

### PopoverRefactor 参数

| 参数名 | 类型          | 默认值 | 说明 | 跳转 Demo             |
| :----- | :------------ | :----- | :--- | :-------------------- |
|        | `string`      |        |      | [基本用法](#基本用法) |
|        | [IXxx](#ixxx) |        |      |                       |
|        |               |        |      |                       |

### PopoverRefactor 事件

| 事件名 | 回调参数 | 说明 | 跳转 Demo |
| :----- | :------- | :--- | :-------- |
|        |          |      |           |
|        |          |      |           |
|        |          |      |           |

### PopoverRefactor 插槽

| 插槽名  | 说明 | 跳转 Demo |
| :------ | :--- | :-------- |
| default |      |           |
|         |      |           |
|         |      |           |

### PopoverRefactor 类型定义

#### IXxx

```ts
interface IXxx {
  xxx: string;
}
```
