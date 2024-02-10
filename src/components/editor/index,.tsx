import EditorJS from '@editorjs/editorjs';
import { useEffect } from 'react';
import Header from '@editorjs/header';

// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import SimpleImage from '@editorjs/Simple-image';
// @ts-ignore
import Checklist from '@editorjs/checklist'
// @ts-ignore
import Quote from '@editorjs/Quote'
// @ts-ignore
import Warning from '@editorjs/Warning'
// @ts-ignore
import Marker from '@editorjs/marker'
// @ts-ignore
import CodeTool from '@editorjs/code'
// @ts-ignore
import Delimiter from '@editorjs/Delimiter'
// @ts-ignore
import InlineCode from '@editorjs/Inline-code'
// @ts-ignore
import LinkTool from '@editorjs/link'
// @ts-ignore
import Embed from '@editorjs/Embed'
// @ts-ignore
import Table from '@editorjs/Table'
const initEditor = () => {
  // @ts-ignore
  window.editor = new EditorJS({
    /**
     * Id of Element that should contain Editor instance
     */
    holder: 'editorjs',
    /**
     * Tools list
     */
    tools: {
      /**
       * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
       */
      header: {
        // @ts-ignore
        class: Header,
        inlineToolbar: ['marker', 'link'],
        config: {
          placeholder: 'Header'
        },
        shortcut: 'CMD+SHIFT+H'
      },

      /**
       * Or pass class directly without any configuration
       */
      image: SimpleImage,

      list: {
        class: List,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+L'
      },

      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },

      quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
          quotePlaceholder: 'Enter a quote',
          captionPlaceholder: 'Quote\'s author',
        },
        shortcut: 'CMD+SHIFT+O'
      },

      warning: Warning,

      marker: {
        class:  Marker,
        shortcut: 'CMD+SHIFT+M'
      },

      code: {
        class:  CodeTool,
        shortcut: 'CMD+SHIFT+C'
      },

      delimiter: Delimiter,

      inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+C'
      },

      linkTool: LinkTool,

      embed: Embed,

      table: {
        class: Table,
        inlineToolbar: true,
        shortcut: 'CMD+ALT+T'
      },

    },
    i18n: {
      messages: {
        ui: {
          blockTunes: {
            toggler: {
              'Click to tune': '点击转换'
            }
          },
          inlineToolbar: {
            converter: {
              'Convert to': '转换'
            }
          },
          toolbar: {
            toolbox: {
              Add: '工具栏添加'
            }
          },
          popover: {
            Filter: '过滤',
            'Nothing found': '找不到'
          }
        },
        toolNames: {
          Text: '段落',
          Bold: '加粗',
          Italic: '斜体',
        },
        tools: {
          paragraph: {
            'Press Tab': '输入内容'
          },
        },
        blockTunes: {
          delete: {
            Delete: '删除'
          },
          moveUp: {
            'Move up': '上移'
          },
          moveDown: {
            'Move down': '下移'
          },
        },
      },
    },
    /**
     * Initial Editor data
     */
    data: {
      blocks: [
      ]
    },
    onReady: function(){
      // saveButton.click();
    },
    onChange: function(api, event) {
      console.log('something changed', event);
    }
  });
}

const Editor = () => {
  useEffect(() => {
    initEditor()
    return () => {

    };
  }, []);


  return <div id="editorjs" className="" />;
}

export default Editor
