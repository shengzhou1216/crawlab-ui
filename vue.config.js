const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const optimization = {
  splitChunks: {
    chunks: 'initial',
    minSize: 20000,
    minChunks: 1,
    maxAsyncRequests: 3,
    cacheGroups: {
      defaultVendors: {
        test: /[\\/]node_modules[\\/]]/,
        priority: -10,
        reuseExistingChunk: true,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      }
    },
  },
}

const config = {
  outputDir: './dist',
  configureWebpack: {
    plugins: [],
  },
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
}


module.exports = config
