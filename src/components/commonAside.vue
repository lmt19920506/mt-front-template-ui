<template>
  <div class="h-100 ">
    <el-scrollbar style="height: 100%">
      <el-menu
        :default-active="activeMenu"
        background-color="#005CB9"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router
      >
        <el-menu-item
          class="noChildMenu"
          :index="item.path"
          v-for="item in noChildren"
          :key="item.path"
          @click="clickMenu(item)"
        >
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.name}}</span>
        </el-menu-item>
        <el-submenu class="haveChild_submenu" :index="item.path" v-for="(item, index) in haveChildren" :key="index">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.name}}</span>
          </template>
          <template v-for="(subItem, subIndex) in item.children">
            <el-menu-item
              :index="subItem.path"
              v-if="!subItem.children && !subItem.meta.hidden"
              :key="subIndex"
              @click="clickMenu(subItem)"
            >
              <!-- <i :class="subItem.meta.icon"></i> -->
              <i style="margin-left: 10px"></i>
              {{subItem.meta.name}}
            </el-menu-item>
          </template>
          <template v-for="(s, i) in item.children">
            <el-submenu :index="s.id" v-if="s.children && s.children.length > 0" :key="i">
              <template slot="title">
                <i class="el-icon-view"></i>
                {{s.name}}
              </template>
              <el-menu-item
                :index="o.href"
                v-for="(o, oInd) in s.children"
                :key="oInd"
                @click="clickMenu(o)"
              >
                <i class="el-icon-caret-left"></i>
                {{o.name}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      asideMenu: [
        { href: "/dashboard", name: "首页", icon: "home", id: "1", label: "Dashboard" },
        {
          name: "Table",
          icon: "user",
          id: "3",
          children: [
            { href: "/showTable", name: "showTable", icon: "setting", label: "showTable" },
            { href: "/tableAutoScroll", name: "页面2", icon: "setting", label: "auto scroll" },
          ],
        },
      ],
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(e) {
      console.log("path---", e);
      // this.$router.push({path: e.href})
      this.$router.push({path: e.path});
    },
  },
  computed: {
    menuList() {
      // let data = localStorage.getItem("menu");
      // return JSON.parse(data);
      // return this.$store.state.tab.menu
      // return this.asideMenu
      return this.$store.state.sidebarMenu
    },
    noChildren() {
      return this.menuList.filter((item) => !item.children);
    },
    haveChildren() {
      return this.menuList.filter((item) => item.children);
    },
    activeMenu() {
      const route = this.$route;
      const { meta, matched, path } = route;
      // if set path, the sidebar will highlight the path you set
      const activeMenu = meta.activeMenu || meta.routerPath;
      if (activeMenu) return `/${activeMenu}`;
      // ignore dynamics route
      for (let i = matched.length - 1; i >= 0; i--) {
        const matchedPath = matched[i].path;
        if (matchedPath.indexOf(':') === -1) return matchedPath;
      }

      return path;
    },
  }
};
</script>

<style lang="scss">
.el-menu-vertical-demo {
  border-right: 0!important
}
.el-scrollbar__wrap {
  overflow-x: hidden!important;
}
.noChildMenu {
  text-align: left;
}
.haveChild_submenu {
  text-align: left;
  .el-menu-item {
    text-align: left;
  }
}
</style>
