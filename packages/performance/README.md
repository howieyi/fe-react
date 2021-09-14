# `@iosecret/performance`

> 性能检测上报工具

## Usage

```typescript
import Per from '@iosecret/performance';

const per = new Per(2000);

// 1. 获取首次绘制时间点
per.getFPTime();

// 2. 获取首次内容绘制时间点（文本、图片（包含背景图）、非白色的canvas或SVG时）
per.getFCPTime();

// 3. 获取页面加载数据
per.getPageTime();

// 4. 获取资源加载超时列表数据
per.getResourceTime();

// 5. 定义数据上报规则
per.onTrace(data => trace(data));
```
