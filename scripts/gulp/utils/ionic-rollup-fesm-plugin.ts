import { readFileSync } from 'fs';

export function ionicRollupFesmPlugin() {
  return {
    name: 'ionic-rollup-fesm',

    transform(sourceText: string, sourcePath: string) {
      const fileContent = readFileSync(sourcePath);

      const modifiedFileContent = `/* ${sourcePath} */ \n ${fileContent}`;

      return {
        code: modifiedFileContent
      };
    }
  };
};
