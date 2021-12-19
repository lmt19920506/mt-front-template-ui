<template>
  <div id="app1">
    <form-create
      v-model="fApi"
      :rule="rule"
      :option="option"
      :value.sync="value"
    ></form-create>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //实例对象
      fApi: {},
      //表单数据
      value: {},
      //表单生成规则
      rule: [
        {
          type: "input",
          field: "goods_name",
          title: "商品名称",
        },
        {
          type: "datePicker",
          field: "created_at",
          title: "创建时间",
        },
      ],
      //组件参数配置
      option: {
        //表单提交事件
        onSubmit: function(formData) {
          alert(JSON.stringify(formData));
        },
      },
    };
  },
};
</script>

<style></style>
