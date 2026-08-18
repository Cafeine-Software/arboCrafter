import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { buildFileTree } from './arboCrafter.js';

function createTmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'arbocrafter-test-'));
}

function cleanDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

describe('buildFileTree', () => {

  let tmpDir;
  let outputPath;

  beforeEach(() => {
    // Create a temporary directory for each run of the test suite
    tmpDir = createTmpDir();
    // Set the output path to a subdirectory of the temporary directory
    outputPath = path.join(tmpDir, 'out');
  });

  afterEach(() => {
    // Clean up the temporary directory after each test
    cleanDir(tmpDir);
  });

  it('creates an empty folder', () => {
    buildFileTree({ folder1: {} }, outputPath);

    assert.ok(fs.existsSync(path.join(outputPath, 'folder1')));
    assert.ok(fs.statSync(path.join(outputPath, 'folder1')).isDirectory());
  });

  it('creates nested folders', () => {
    buildFileTree({
      a: {
        b: {
          c: {}
        }
      }
    }, outputPath);

    assert.ok(fs.existsSync(path.join(outputPath, 'a', 'b', 'c')));
    assert.ok(fs.statSync(path.join(outputPath, 'a', 'b', 'c')).isDirectory());
  });

  it('creates a file with text content', () => {
    buildFileTree({
      'hello.txt': 'Hello World'
    }, outputPath);

    const content = fs.readFileSync(path.join(outputPath, 'hello.txt'), 'utf-8');
    assert.equal(content, 'Hello World');
  });

  it('creates an empty file (empty string)', () => {
    buildFileTree({
      'empty.txt': ''
    }, outputPath);

    const content = fs.readFileSync(path.join(outputPath, 'empty.txt'), 'utf-8');
    assert.equal(content, '');
  });

  it('creates a file inside a subfolder', () => {
    buildFileTree({
      docs: {
        'readme.md': '# Title'
      }
    }, outputPath);

    const content = fs.readFileSync(path.join(outputPath, 'docs', 'readme.md'), 'utf-8');
    assert.equal(content, '# Title');
  });

  it('creates a full structure with mixed folders and files', () => {
    buildFileTree({
      src: {
        'index.js': 'console.log("hi")',
        utils: {
          'helper.js': 'export default {}'
        }
      },
      'package.json': '{"name":"test"}',
      dist: {}
    }, outputPath);

    assert.ok(fs.statSync(path.join(outputPath, 'src')).isDirectory());
    assert.ok(fs.statSync(path.join(outputPath, 'src', 'utils')).isDirectory());
    assert.ok(fs.statSync(path.join(outputPath, 'dist')).isDirectory());
    assert.equal(fs.readFileSync(path.join(outputPath, 'src', 'index.js'), 'utf-8'), 'console.log("hi")');
    assert.equal(fs.readFileSync(path.join(outputPath, 'src', 'utils', 'helper.js'), 'utf-8'), 'export default {}');
    assert.equal(fs.readFileSync(path.join(outputPath, 'package.json'), 'utf-8'), '{"name":"test"}');
  });

  it('handles an empty structure without error', () => {
    buildFileTree({}, outputPath);

    assert.ok(fs.existsSync(outputPath));
    assert.ok(fs.statSync(outputPath).isDirectory());
  });

  it('copies a source file using @ syntax', () => {
    const srcFile = path.join(tmpDir, 'source.txt');
    fs.writeFileSync(srcFile, 'original content');

    buildFileTree({
      'copy.txt': `@${srcFile}`
    }, outputPath);

    const content = fs.readFileSync(path.join(outputPath, 'copy.txt'), 'utf-8');
    assert.equal(content, 'original content');
  });

  it('throws when @ source file does not exist', () => {
    assert.throws(() => {
      buildFileTree({
        'missing.txt': '@/nonexistent/path/file.txt'
      }, outputPath);
    }, { message: /Error while building file tree/ });
  });

  it('copies a source folder with its structure using @ syntax', () => {
    const srcDir = path.join(tmpDir, 'srcFolder');
    fs.mkdirSync(srcDir);
    fs.writeFileSync(path.join(srcDir, 'a.txt'), 'file A');
    fs.writeFileSync(path.join(srcDir, 'b.txt'), 'file B');

    buildFileTree({
      folderCopy: `@${srcDir}`
    }, outputPath);

    const distDir = path.join(outputPath, 'folderCopy');
    assert.ok(fs.existsSync(distDir));
    assert.equal(fs.readFileSync(path.join(distDir, 'a.txt'), 'utf-8'), 'file A');
    assert.equal(fs.readFileSync(path.join(distDir, 'b.txt'), 'utf-8'), 'file B');
  });

  it('copies a source folder containing subfolders', () => {
    const srcDir = path.join(tmpDir, 'srcNested');
    fs.mkdirSync(path.join(srcDir, 'sub'), { recursive: true });
    fs.writeFileSync(path.join(srcDir, 'root.txt'), 'root file');
    fs.writeFileSync(path.join(srcDir, 'sub', 'deep.txt'), 'deep file');

    buildFileTree({
      copied: `@${srcDir}`
    }, outputPath);

    const distDir = path.join(outputPath, 'copied');
    assert.ok(fs.existsSync(distDir));
    assert.equal(fs.readFileSync(path.join(distDir, 'root.txt'), 'utf-8'), 'root file');
    assert.equal(fs.readFileSync(path.join(distDir, 'sub', 'deep.txt'), 'utf-8'), 'deep file');
  });

  it('flattens a source folder using @! syntax (files only, no structure)', () => {
    const srcDir = path.join(tmpDir, 'srcFlatten');
    fs.mkdirSync(path.join(srcDir, 'sub'), { recursive: true });
    fs.writeFileSync(path.join(srcDir, 'a.txt'), 'file A');
    fs.writeFileSync(path.join(srcDir, 'sub', 'b.txt'), 'file B');

    buildFileTree({
      flat: `@!${srcDir}`
    }, outputPath);

    const distDir = path.join(outputPath, 'flat');
    assert.equal(fs.readFileSync(path.join(distDir, 'a.txt'), 'utf-8'), 'file A');
    assert.equal(fs.readFileSync(path.join(distDir, 'b.txt'), 'utf-8'), 'file B');
    // Subfolder "sub" must NOT exist in destination
    assert.ok(!fs.existsSync(path.join(distDir, 'sub')));
  });

  it('creates nested output path if it does not exist', () => {
    const deepOutput = path.join(tmpDir, 'level1', 'level2', 'out');

    buildFileTree({ 'test.txt': 'ok' }, deepOutput);

    assert.equal(fs.readFileSync(path.join(deepOutput, 'test.txt'), 'utf-8'), 'ok');
  });

});
