<template>
  <div>
    <Calendar
      ref="Calendar"
      :sundayStart="true"
      :markDateMore="markDate"
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
      v-on:isToday="clickToday"
    ></Calendar>
  </div>
</template>

<script>
import Calendar from "./component/calendar.vue";
export default {
  components: {
    Calendar,
  },
  data() {
    return {
      markDate: [
        {date: '2022/4/6', className: 'mark1'},
        {date: '2022/4/5', className: 'mark2'},
        {date: '2022/4/4', className: 'mark2'},
      ],
      // ms: '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'
    }
  },
  methods: {
    clickDay(data) {
      console.log('clickDay---', data)
    },
    changeDate(data) {
      console.log('changeDate---', data)
    },
    clickToday(data) {
      console.log('clickToday---', data)
    }
  }
};
</script>

<style lang="scss">
.wh_container {
  // border: 1px solid #F0F0F2;
}
.wh_content_all {
  background-color: #fff !important;
}
.wh_top_changge {
  li {
    color: #222226 !important;
  }
  .wh_jiantou1 {
    border-top: 2px solid #222226 !important;
    border-left: 2px solid #222226 !important;
  }
  .wh_jiantou2 {
    border-top: 2px solid #222226 !important;
    border-right: 2px solid #222226 !important;
  }
}
.wh_content_item_tag {
  color: #222226 !important;
  width: 14% !important;
}
.wh_content_item {
  color: #222226 !important;
  width: 14% !important;
  .wh_item_date {
    width: 28px !important;
    height: 28px !important;
    line-height: 28px !important;
    background: #f9f9f9 !important;
    border-radius: 0 !important;
    &:hover {
      background: rgba(0, 0, 0, 0.1) !important;
    }
  }
  .wh_chose_day {
    border: 1px solid #222226;
    width: 28px !important;
    height: 28px !important;
    line-height: 28px !important;
    border-radius: 0 !important;
  }
  .mark1 {
    // background: rgba(64, 158, 255, 0.2) !important;
    background: rgba(51, 187, 170, 0.2)!important
  }
  .mark2 {
    background: #409eff !important;
  }
  .wh_isToday {
    border-radius: 0 !important;
    background: #33BBAA !important;
  }
}
</style>