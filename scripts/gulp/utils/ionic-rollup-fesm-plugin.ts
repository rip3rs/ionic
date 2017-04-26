import { readFileSync } from 'fs';

export function ionicRollupFesmPlugin() {
  return {
    name: 'ionic-rollup-fesm',

    transform(sourceText: string, sourcePath: string) {
      const fileContent = readFileSync(sourcePath);

      if (sourcePath.includes('components')) {
        // need to add a comment as this is a component
        const modifiedFileContent = `/* ${sourcePath} */ \n ${fileContent} /* ${sourcePath} */ \n`;
        return {
          code: modifiedFileContent
        };
      } else {
        // not a component, just return
        return {
          code: fileContent
        };
      }

    }
  };
};
