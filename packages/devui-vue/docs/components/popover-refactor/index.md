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
      <template #reference>
        <div id="reference"></div>
      </template>
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
    return {};
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

  #floating {
    position: absolute;
    background: gray;
    padding: 0.5rem;
    color: white;
    z-index: 999;
  }
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
