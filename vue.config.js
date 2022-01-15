const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const optimization = {
  splitChunks: {
    chunks: 'initial',
    minSize: 20000,
    minChunks: 1,
    maxAsyncRequests: 3,
    cacheGroups: {
      echarts: {
        test: /[\\/]node_modules[\\/]echarts/,
        priority: -1,
        enforce: true,
      },
      element: {
        test: /[\\/]node_modules[\\/]@?element/,
        priority: -1,
        enforce: true,
      },
      codemirror: {
        test: /[\\/]node_modules[\\/]codemirror/,
        priority: -1,
        enforce: true,
      },
      fontawesome: {
        test: /[\\/]node_modules[\\/](@fortawesome|fontawesome)/,
        priority: -1,
        enforce: true,
      },
      'atom-material-icons': {
        test: /[\\/]node_modules[\\/]atom-material-icons/,
        priority: -1,
        enforce: true,
      },
      defaultVendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        reuseExistingChunk: true,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  },
}

const alias = {
  'element-plus$': 'element-plus/dist/index.full.min.js',
  'echarts$': 'echarts/dist/echarts.min.js',
  'codemirror$': 'codemirror/lib/codemirror.js',
}

const config = {
  outputDir: './dist',
  configureWebpack: {
    plugins: [],
    resolve: {
      alias,
    },
  }
}

if (process.env.ENTRY) {
  config.pages = {
    index: {
      entry: `src/entry/${process.env.ENTRY}`,
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Crawlab | Distributed Web Crawler Platform',
    }
  }
}

if (['development', 'local'].includes(process.env.NODE_ENV)) {
  config.configureWebpack.optimization = optimization
} else if (['production'].includes(process.env.NODE_ENV)) {
  config.configureWebpack.plugins.push(new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'public/js'),
      }
    ]
  }))
} else if (['analyze'].includes(process.env.NODE_ENV)) {
  config.configureWebpack.optimization = optimization
  config.configureWebpack.plugins.push(new BundleAnalyzerPlugin())
}


module.exports = config
