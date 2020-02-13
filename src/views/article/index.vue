<template>
  <div class="container-article">
    <!-- 筛选区域 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <template>
            <el-radio-group v-model="filterData">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select @change="changeChannel" v-model="filterData.channel_id" placeholder="请选择" clearable>
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
            <!-- label 选项文字 value选项的值，当你选择某个选项后，该选项的值提供v-model -->
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="search()" type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" style="width:150px;height:100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      style="margin-top:20px"
      background
      layout="prev, pager, next"
      @current-change="pager"
      :current-page='filterData.page'
      :page-size="filterData.per_page"
      :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  //注意：组件名称不能喝原生标签同名
  name: "app-article",
  data() {
    return {
      articles: [],
      total: 0,
      //声明筛选条件的数据,筛选条件数据提交给后台，数据字段的名称由后台决定
      //筛选数据是由多个表单元素组成，需要收集所有数据，应该使用对象来进行绑定
      filterData: {
        //当字段值为null axios请求不会提交，代表不传
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      //频道下拉选项数据
      channelOptions: [],
      //日期范围数据[起始日期，结束日期]
      //但是选择完成日期范围后，可以根据这个数据给begin_pubdate和end_pubdate赋值
      dataArr: []
    };
  },
  created() {
    this.getChannelOptions();
    this.getArticles();
  },
  methods: {
    //频道改变后
    changeChannel (){
      if(this.filterData.channel_id === ''){
        this.filterData.channel_id = null
      }
    },
    //筛选逻辑
    search(){
      this.filterData.page = 1
      this.getArticles()
    },
    //选择日期范围
    changeDate(dateArr) {
      if (dateArr) {
        this.filterData.begin_pubdate = dateArr[0];
        this.filterData.end_pubdate = dateArr[1];
      } else {
        this.filterData.begin_pubdate = null;
        this.filterData.end_pubdate = null;
      }
    },
    //分页切
    pager(newPage){
      //修改参数
      this.filterData.page = newPage
      this.getArticles()
    },
    //获取频道数据
    async getChannelOptions() {
      //发请求获取频道数据
      const res = await this.$http.get("channels");
      //res = {data:{message:'' data:{chanels:[// 频道数组 ]}}}
      // this.channelOptions = [{id,name}] 数据格式
      this.channelOptions = res.data.data.channels;
    },
    // 获取文章数据
    async getArticles() {
      // post('地址','请求体数据')
      // get('地址',{params:'地址栏键值对数据get对象参数'})
      //如果是get请求，如何传递参数对象
      const res = await this.$http.get("articles", { params: this.filterData });
      this.articles = res.data.data.results;
      //设置总条数
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style scoped lang='less'></style>