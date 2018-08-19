// 全局方向 0123 上右下左
let dir = [
  [-1, 0], [0, 1], [1, 0], [0, -1]
]

class Maze {
  constructor(height = 3, width = 4) {
    this.height = height
    this.width = width
    // 并查集
    this.father = Array.from(Array(height * width)).map((item, index) => index)

    // 矩阵，15表示周围不联通4个字节依次为上右下左
    // 1 --> 0001 表示只有上有边
    // 15 --> 1111 表示四周都有边
    // 12 --> 1100 表示下左有边
    this.mat = Array.from(Array(height)).map(
      () => Array.from(Array(width)).map(() => 15)
    )

    this.init()
  }

  init() {
    // d对应的新的相对方向
    let nd = [2, 3, 0, 1]
    while (true) {

      // 随机选取坐标和方向
      let index1 = parseInt(Math.random() * this.height * this.width)
      let x1 = parseInt(index1 / this.width)
      let y1 = parseInt(index1 - x1 * this.width)
      let d = parseInt(Math.random() * 4)
      console.log(index1, dir)
      console.log(x1, y1, d)
      let x2 = x1 + dir[d][0]
      let y2 = y1 + dir[d][1]

      if (x2 < 0 || y2 < 0 || x2 >= this.height || y2 >= this.width)
        continue

      let index2 = x2 * this.width + y2
      console.log(x2, y2, index2)
      // 两个相邻点是否同根
      let r1 = this.getRoot(index1)
      let r2 = this.getRoot(index2)

      // 如果不同根，合并
      if (r1 != r2) {
        this.union(index1, index2)
        // 修改对应格子处的数字
        this.mat[x1][y1] &= (15 - (1 << d))
        // 0-2,1-3,2-0,3-1
        this.mat[x2][y2] &= (15 - (1 << nd[d]))
      }

      // 如果起点和终点已经联通，返回
      if (this.check()) {
        return
      }
    }
  }

  // 合并两个索引
  union(index1, index2) {
    let r1 = this.getRoot(index1)
    let r2 = this.getRoot(index2)
    if (r1 != r2)
      this.father[r1] = r2
  }

  // 返回index的root，并进行路径压缩
  getRoot(index) {
    let x = index
    while (index != this.father[index])
      index = this.father[index]

    while (x != this.father[x]) {
      let t = x
      x = this.father[x]
      this.father[t] = index
    }
    return index
  }

  // 判断首尾是否联通
  check() {
    return this.father[0] == this.father[this.width * this.height - 1]
  }


  getPath() {
    // 保存队列的数组和是否可以访问数组
    let q = []
    let vis = Array.from(Array(this.height)).map(
      () => Array.from(Array(this.width)).map(() => 1)
    )
    // 保存最终路径的数组
    let path = []

    vis[0][0] = 0
    q.push([0, 0, -1])
    let front = 0
    let tail = 1
    while (front < tail) {
      let t = q[front]
      if (t[0] == this.height - 1 && t[1] == this.width - 1) {
        let tt = t.slice()
        while (tt[2] != -1) {
          path.splice(0, 0, tt.slice())
          tt = q[tt[2]]
        }
        path.splice(0, 0, q[0])
        break
      }

      for (let i = 0; i < 4; i++) {
        let nx = t[0] + dir[i][0]
        let ny = t[1] + dir[i][1]
        if (nx >= 0 && ny >= 0 && nx < this.height && ny < this.width
          && vis[nx][ny]
          && !(this.mat[t[0]][t[1]] & (1 << i))
        ) {
          q.push([nx, ny, front])
          vis[nx][ny] = 0
          tail++
        }
      }
      front += 1
    }

    // 为路径上的格子添加信息，加上一个高位
    // 高位为1 表示该格子是路径
    for (let i of path) {
      this.mat[i[0]][i[1]] += (1 << 4)
    }
    return path
  }
}


export default Maze
